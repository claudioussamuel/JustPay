import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

const INFURA_RPC=`https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_APP_ID}`;

const PRIVATE_KEY = process.env.NEXT_PUBLIC_INFURA_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_INFURA_PRIVATE_KEY.startsWith("0x")
    ? (process.env.NEXT_PUBLIC_INFURA_PRIVATE_KEY as `0x${string}`)
    : (`0x${process.env.NEXT_PUBLIC_INFURA_PRIVATE_KEY}` as `0x${string}`)
  : null;




export const client = createPublicClient({
    chain: sepolia,
    transport: http(INFURA_RPC),
})



export const account = PRIVATE_KEY ? privateKeyToAccount(PRIVATE_KEY) : null