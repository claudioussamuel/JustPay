import { contractAddress,contractAbi } from '@/lib/integrations/viem/abi';
import { NextApiRequest, NextApiResponse } from 'next';

import { createPublicClient, createWalletClient, getContract, Hex, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
  ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith("0x")
    ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
    : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
  : null;
  const BASE_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ID}`;
  const account = privateKeyToAccount(PRIVATE_KEY as Hex);


  (async () => {
    const client = createWalletClient({
        account,
        chain: sepolia,
        transport: http(BASE_SEPOLIA),
      }).extend(publicActions);

      const contract = getContract({
        address: contractAddress,
        abi: contractAbi,
        client,
      });

      await contract.write.executeTransactions();
  })();

    res.status(200).json({ message: "Hello Claudious" });
}