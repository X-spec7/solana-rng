import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { RandomNumberGenerator } from '../target/types/random_number_generator';
import { assert } from 'chai';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import adminSecretArray from "./wallets/admin.json";

describe('random_number_generator', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const admin = Keypair.fromSecretKey(Uint8Array.from(adminSecretArray));
  const adminPubkey = admin.publicKey;

  const program = anchor.workspace.RandomNumberGenerator as Program<RandomNumberGenerator>;
  const PROGRAM_ID = program.programId;

  const getRandomDataPDA = async () => {
    const [randomDataPDA, bump] = await PublicKey.findProgramAddressSync(
      [Buffer.from('RANDOM_DATA')],
      PROGRAM_ID
    );
    return { randomDataPDA, bump };
  };

  it('Generates multiple random numbers for multiple ranges', async () => {
    const { randomDataPDA } = await getRandomDataPDA();

    const ranges = [
      { minRange: new anchor.BN(1), maxRange: new anchor.BN(50) },
      { minRange: new anchor.BN(51), maxRange: new anchor.BN(100) },
    ];

    const serverSeed = 'updated_server_seed';
    const clientSeed = 'updated_client_seed';
    const nonce = new anchor.BN(123);

    await program.methods
      .generateRandomNumbers(ranges, serverSeed, clientSeed, nonce)
      .accounts({
        randomData: randomDataPDA,
        user: admin.publicKey,
        systemProgram: SystemProgram.programId,
      } as any)
      .signers([admin])
      .rpc();

    const account = await program.account.randomData.fetch(randomDataPDA);

    console.log(
      'Generated Random Numbers:',
      account.lastGeneratedNumbers.map((bn: anchor.BN) => bn.toNumber())
    );

    assert.ok(account.lastGeneratedNumbers.length === 2);
    assert.ok(account.lastGeneratedNumbers[0].gte(new anchor.BN(1)) && account.lastGeneratedNumbers[0].lte(new anchor.BN(50)));
    assert.ok(account.lastGeneratedNumbers[1].gte(new anchor.BN(51)) && account.lastGeneratedNumbers[1].lte(new anchor.BN(100)));
  });
});
