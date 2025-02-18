import bs58 from "bs58";
import { Program } from "@coral-xyz/anchor";
import { IDL, RandomNumberGenerator } from "./idl";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair
} from "@solana/web3.js";

import adminKeypairArray from "./wallet/admin.json";

export const programId = new PublicKey("9QFtTFeHQKe2BGmwAY2iUEN4SBywa9FuGC1qvJr6D31g");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const getAdminKeypair = () => {
  return Keypair.fromSecretKey(Uint8Array.from(adminKeypairArray));
};

export const getAdminPublicKey = () => {
  return getAdminKeypair().publicKey;
};

export const rngProgram = new Program<RandomNumberGenerator>(IDL, programId, {
  connection
});

export const RANDOM_DATA_SEED = "RANDOM_DATA";

export const getRandomDataPDA = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(RANDOM_DATA_SEED)],
    programId
  );
}
