import { contractAddress, contractAbi } from '@/lib/integrations/viem/abi';
import { NextResponse } from 'next/server';
import { createWalletClient, getContract, http, publicActions } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

export async function GET() {
  const PRIVATE_KEY = process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY
    ? process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY.startsWith('0x')
      ? (process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY as `0x${string}`)
      : (`0x${process.env.NEXT_PUBLIC_META_MASK_PRIVATE_KEY}` as `0x${string}`)
    : null;

  if (!PRIVATE_KEY) {
    return NextResponse.json(
      { error: 'Private key is missing or invalid' },
      { status: 400 }
    );
  }

  const BASE_SEPOLIA = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_SEPOLIA_ID}`;
  const account = privateKeyToAccount(PRIVATE_KEY);

  try {
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

    return NextResponse.json({ message: 'Transactions executed successfully' });
  } catch (error) {
    console.error('Error executing transactions:', error);
    return NextResponse.json(
      { error: 'Failed to execute transactions' },
      { status: 500 }
    );
  }
}