import { BN } from "bn.js";
import { IRange } from "../types";
import {
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  rngProgram,
  getRandomDataPDA,
  getAdminPublicKey,
  connection,
  getAdminKeypair,  
} from "../setup"; // Import your program and helper functions

type BNType = InstanceType<typeof BN>;

export const generateRandomNumbers = async (
  ranges: IRange[],
  serverSeed: string,
  clientSeed: string,
  nonce: number
) => {
  console.log("Starting generateRandomNumbers function...");

  const [randomDataPda] = getRandomDataPDA();
  console.log("Random Data PDA:", randomDataPda.toBase58());

  const formattedRanges = ranges.map((range) => ({
    minRange: new BN(range.minRange),
    maxRange: new BN(range.maxRange),
  }));

  console.log("Formatted Ranges:", formattedRanges);
  console.log("Server Seed:", serverSeed);
  console.log("Client Seed:", clientSeed);
  console.log("Nonce:", nonce);
  
  const transaction = new Transaction();

  const createRNGTransaction = await rngProgram.methods
    .generatePack(formattedRanges, serverSeed, clientSeed, new BN(nonce))
    .accounts({
      randomData: randomDataPda,
      user: getAdminPublicKey(),
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  transaction.add(createRNGTransaction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [getAdminKeypair()]);
  console.log("Transaction signature:", signature);

  const account = await rngProgram.account.randomData.fetch(randomDataPda);

  const randomNumbers = account.lastGeneratedNumbers.map((bn: BNType) => bn.toNumber())

  console.log(
    'Generated Random Numbers:',
    randomNumbers
  );

  return randomNumbers

  // return new Promise<number[]>(async (resolve, reject) => {
  //   let listenerId: number;
  //   let timeoutId: NodeJS.Timeout;

  //   try {
  //     console.log("Adding event listener for RandomNumbersGenerated...");
  //     listenerId = rngProgram.addEventListener("RandomNumbersGenerated", (event) => {
  //       console.log("Event data received:", event);

  //       const randomNumbers = event.randomNumbers.map((num: BNType) => num.toNumber());
  //       console.log("Generated Random Numbers:", randomNumbers);

  //       rngProgram.removeEventListener(listenerId); // Clean up listener

  //       console.log("clearing timeout");
  //       clearTimeout(timeoutId); // Stop timeout when successful
  //       console.log("cleared timeout");
  //       resolve(randomNumbers);
  //     });

  //     const transaction = new Transaction();

  //     const createRNGTransaction = await rngProgram.methods
  //       .generateRandomNumbers(formattedRanges, serverSeed, clientSeed, new BN(nonce))
  //       .accounts({
  //         randomData: randomDataPda,
  //         user: getAdminPublicKey(),
  //         systemProgram: SystemProgram.programId,
  //       })
  //       .instruction();

  //     transaction.add(createRNGTransaction);

  //     const signature = await sendAndConfirmTransaction(connection, transaction, [getAdminKeypair()]);
  //     console.log("Transaction signature:", signature);

  //     // Start a timeout but clear it when the promise resolves
  //     timeoutId = setTimeout(() => {
  //       console.error("Timeout: Function did not complete within 30s!");
  //       rngProgram.removeEventListener(listenerId); // Ensure listener is removed on timeout
  //       reject(new Error("Timeout: Function did not complete"));
  //     }, 30000); // 30 seconds timeout
  //   } catch (error) {
  //     console.error("Error generating random numbers:", error);
  //     reject(error);
  //   }
  // });
};

(async () => {
  const testRanges = [
    { minRange: 1, maxRange: 100 },
    { minRange: 50, maxRange: 100 },
    { minRange: 10, maxRange: 30 },
  ];
  const testServerSeed = "server_seed_example";
  const testClientSeed = "client_seed_example";
  const testNonce = 1; console.log("🚀 Calling generateRandomNumbers...");
  try {
    const result = await generateRandomNumbers(testRanges, testServerSeed, testClientSeed, testNonce);
    console.log("🎲 Generated numbers:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
