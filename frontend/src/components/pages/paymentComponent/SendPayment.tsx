"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { useAppContext } from "@/app/context/AppContext";

function SendPayment() {
 
  const { receipientAddress, setRecipientAddress } = useAppContext();
  const searchParams = useSearchParams();
  const walletFromUrl = searchParams.get("wallet") || "";

 
  useEffect(() => {
    if (walletFromUrl) {
      setRecipientAddress(walletFromUrl);
    }
  }, [walletFromUrl, setRecipientAddress]);

  return (
    <div className="h-[100vh]">
      <h3 className="font-dmMono capitalize lg:text-3xl text-zinc-800">
        Send payment To the address below
      </h3>
      <div className="max-w-2xl flex items-center gap-5 mt-5 border p-2 bg-brand-gray rounded-full">
        <CiSearch className="text-zinc-800 text-3xl" />
        <input
          type="text"
          className="w-full lg:placeholder:text-[20px] placeholder:text-zinc-800 placeholder:font-dmMono text-zinc-800 outline-none border-none placeholder:items-center shadow-none bg-transparent font-dmMono"
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
