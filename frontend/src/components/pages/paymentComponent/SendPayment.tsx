"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { usePrivy } from "@privy-io/react-auth";
import { allowance } from "@/lib/integrations/viem/contract";
import { contractAddress } from "@/lib/integrations/viem/abi";
import { useAppContext } from "@/app/context/AppContext";

function SendPayment() {
  const { user } = usePrivy();
  const walletAddress = user?.wallet?.address;
  const [amount, setAmount] = useState<bigint | null>(null);
  const { receipientAddress, setRecipientAddress } = useAppContext();
  const [txs] = useState(""); 
  const searchParams = useSearchParams();
  const walletFromUrl = searchParams.get("wallet") || "";


  useEffect(() => {
    if (walletFromUrl) {
      setRecipientAddress(walletFromUrl);
    }
  }, [walletFromUrl, setRecipientAddress]);
  useEffect(() => {
    const fetchUserData = async () => {
      if (walletAddress) {
        const history = await allowance(walletAddress as `0x${string}`, contractAddress);
        if (history) {
          setAmount(history);
        }
      }
    };

    fetchUserData();
  }, [walletAddress, txs]);

  return (
    <div className="h-[100vh]">
      <h3 className="font-dmMono capitalize text-3xl text-zinc-800">
        Send payment To the address below
      </h3>
      {!amount && (
        <p className="text-[18px] font-dmMono text-zinc-800">
          Click on approve first, before you proceed
        </p>
      )}
      <div className="max-w-2xl flex items-center gap-5 mt-5 border p-2 bg-brand-gray rounded-full">
        <CiSearch className="text-zinc-800 text-3xl" />
        <input
          type="text"
          className="w-full placeholder:text-[20px] placeholder:text-zinc-800 placeholder:font-dmMono text-zinc-800 outline-none border-none placeholder:items-center shadow-none bg-transparent font-dmMono"
          placeholder="place in recipient address"
          value={receipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
        />
      </div>

      <div className="mt-5">
          <Link href="/payment/sendPayment" className="font-dmMono">
            <Button className="px-10 py-5 text-2xl bg-softBlend capitalize mt-3">
              Next
            </Button>
          </Link>

      </div>
    </div>
  );
}

export default SendPayment;
