import { Keypair } from "@solana/web3.js";

import programIdKeyPair from "./wallet/counter-keypair.json";

export const getProgramId = () => {
  const keypair = Keypair.fromSecretKey(Uint8Array.from(programIdKeyPair));
  console.log(keypair.publicKey)
};

(() => {
  getProgramId();
})();
