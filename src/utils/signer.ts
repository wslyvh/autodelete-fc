import { mnemonicToAccount } from "viem/accounts";

const SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN = {
  name: "Farcaster SignedKeyRequestValidator",
  version: "1",
  chainId: 10,
  verifyingContract: "0x00000000fc700472606ed4fa22623acf62c60553",
} as const;

const SIGNED_KEY_REQUEST_TYPE = [
  { name: "requestFid", type: "uint256" },
  { name: "key", type: "bytes" },
  { name: "deadline", type: "uint256" },
] as const;

const appFid = Number(process.env.APP_FID);
const account = mnemonicToAccount(process.env.APP_MNENOMIC ?? "");

const deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day

export async function signKeyRequest(publicKey: `0x${string}`) {
  if (!process.env.APP_FID) {
    throw new Error("APP_FID is not set");
  }
  if (!process.env.APP_MNENOMIC) {
    throw new Error("APP_MNENOMIC is not set");
  }

  const signature = await account.signTypedData({
    domain: SIGNED_KEY_REQUEST_VALIDATOR_EIP_712_DOMAIN,
    types: {
      SignedKeyRequest: SIGNED_KEY_REQUEST_TYPE,
    },
    primaryType: "SignedKeyRequest",
    message: {
      requestFid: BigInt(appFid),
      key: publicKey,
      deadline: BigInt(deadline),
    },
  });

  return signature;
}
