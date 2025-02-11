import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const BASE_SEPOLIA=`https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_BASE_SEPOLIA_ID}`;

const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith("0x")
    ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
    : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
  : null;




export const client = createPublicClient({
    chain: baseSepolia,
    transport: http(BASE_SEPOLIA),
})



export const account = PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : null