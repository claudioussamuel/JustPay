
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";


if (!process.env.NEXT_PUBLIC_SEPOLIA_ID) {
  throw new Error("Missing NEXT_PUBLIC_BASE_SEPOLIA_ID in environment variables");
}


const BASE_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ID}`;



const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith("0x")
    ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
    : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
  : null;

export const client = createPublicClient({
  chain: sepolia,
  transport: http(BASE_SEPOLIA),
});

export const account = PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : null;

