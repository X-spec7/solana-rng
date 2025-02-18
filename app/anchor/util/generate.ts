import { BN } from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { IDL } from "../idl";
import { IRange } from "../types";
import {
  rngProgram,
  getRandomDataPDA,
  getAdminPublicKey
} from "../setup"; // import your program and helper functions

type BNType = InstanceType<typeof BN>;

export const generateRandomNumbers = async (
  ranges: IRange[],
  serverSeed: string,
  clientSeed: string,
  nonce: number
): Promise<number[]> => {
  const [randomDataPda] = getRandomDataPDA();
  
  const formattedRanges = ranges.map(range => ({
    minRange: new BN(range.minRange),
    maxRange: new BN(range.maxRange),
  }));

  return new Promise<number[]>((resolve, reject) => {
    let listenerId: number;
    
    try {
      listenerId = rngProgram.addEventListener(
        "RandomNumbersGenerated",
        (event) => {
          console.log("Event data received:", event);
          const randomNumbers = event.randomNumbers.map((num: BNType) => num.toNumber());
          console.log("Generated random numbers:", randomNumbers);

          rngProgram.removeEventListener(listenerId); // Clean up the listener
          resolve(randomNumbers);
        }
      );

      rngProgram.methods
        .generateRandomNumbers(formattedRanges, serverSeed, clientSeed, new BN(nonce))
        .accounts({
          randomData: randomDataPda,
          user: getAdminPublicKey(),
          systemProgram: PublicKey.default,
        })
        .rpc()
        .then(tx => console.log("Transaction successful:", tx))
        .catch(error => {
          console.error("Error in transaction:", error);
          reject(error);
        });

    } catch (error) {
      console.error("Error generating random numbers:", error);
      reject(error);
    }
  });
};
