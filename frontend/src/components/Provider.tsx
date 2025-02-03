"use client"
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({children}:{children:ReactNode}){
    console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
    return <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>{children}</PrivyProvider>
}