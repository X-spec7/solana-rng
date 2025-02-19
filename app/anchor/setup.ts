import bs58 from "bs58";
import { Program } from "@coral-xyz/anchor";
import { IDL, Otp } from "./idl";
// import { ADMIN_PRIVATE_KEY } from "./wallet/admin";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair
} from "@solana/web3.js";

import adminKeypairArray from "./wallet/admin-keypair.json";

export const programId = new PublicKey("Bku2QgshvPT3M5Zg8gSMXbSicB5uLtkTzuejTACzutWm");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getAdminKeypair = () => {
  return Keypair.fromSecretKey(Uint8Array.from(adminKeypairArray));
};

// export const getAdminKeypair = () => {
//   const decodedAdminKey = bs58.decode(ADMIN_PRIVATE_KEY)
//   const privateKeyIntArray = [...decodedAdminKey]
//   console.log('ADMIN KEY---------------->', privateKeyIntArray)
//   return Keypair.fromSecretKey(bs58.decode(decodedAdminKey));
// };

export const getAdminPublicKey = () => {
  return getAdminKeypair().publicKey;
};

export const rngProgram = new Program<Otp>(IDL, programId, {
  connection
});

export const RANDOM_DATA_SEED = "RANDOM_DATA";

export const getRandomDataPDA = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(RANDOM_DATA_SEED)],
    programId
  );
}
