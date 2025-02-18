import { IdlAccounts, Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { IDL, RandomNumberGenerator } from "./idl";
import { BN } from "bn.js";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair
} from "@solana/web3.js";

import adminKeypairArray from "./wallet/admin.json";

export const programId = new PublicKey("8N2g6ZSRJLf3JdJNtc2MadQnWhXxSg5AWNH1PUWBLivC");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getAdminKeypair = () => {
  return Keypair.fromSecretKey(Uint8Array.from(adminKeypairArray));
};

export const getAdminPublicKey = () => {
  return getAdminKeypair().publicKey;
};

const wallet = new Wallet(getAdminKeypair());

const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });

export const rngProgram = new Program<RandomNumberGenerator>(IDL, programId, provider);

export const RANDOM_DATA_SEED = "RANDOM_DATA";

export const getRandomDataPDA = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(RANDOM_DATA_SEED)],
    programId
  );
}
