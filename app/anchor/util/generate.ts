import { BN } from "bn.js";
import { PublicKey } from "@solana/web3.js";
import { Range } from "../idl"; // make sure Range is properly imported from your IDL
import {
  rngProgram,
  getRandomDataPDA,
  getAdminPublicKey
} from "../setup"; // import your program and helper functions

// Function to generate random numbers
export const generateRandomNumbers = async (
  ranges: Range[], 
  serverSeed: string, 
  clientSeed: string, 
  nonce: number
): Promise<number[]> => {
  const [randomDataPda] = getRandomDataPDA();

  try {
    // Subscribe to the event before making the RPC call
    const randomNumbersGeneratedEvent = rngProgram.addEventListener(
      "randomNumbersGenerated", // Event name
      (event) => {
        // Handle the event here
        console.log("Event data received:", event);
        const randomNumbers = event.randomNumbers.map((num: BN) => num.toNumber());
        console.log("Generated random numbers:", randomNumbers);
        // You can return or process the random numbers here
        return randomNumbers;
      }
    );

    // Call the program's function
    const tx = await rngProgram.methods
      .generateRandomNumbers(ranges, serverSeed, clientSeed, new BN(nonce))
      .accounts({
        randomData: randomDataPda,
        user: getAdminPublicKey(), // User's public key
        systemProgram: PublicKey.default,
      })
      .rpc();

    console.log("Transaction successful:", tx);

    // Wait for the event to be received (or handle the event immediately inside the listener)
    return new Promise<number[]>((resolve) => {
      randomNumbersGeneratedEvent.then((randomNumbers) => resolve(randomNumbers));
    });
    
  } catch (error) {
    console.error("Error generating random numbers:", error);
    throw error; // Rethrow to handle it outside the function
  }
};
