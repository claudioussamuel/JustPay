"use client"
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { sepolia } from "viem/chains";

export function Providers({children}:{children:ReactNode}){
    return <PrivyProvider 
    config={{
        loginMethods:[
            "wallet",
            "email",
            "github",
            "tiktok", 
            "twitter",
            "discord",
            "google", 
            "linkedin"
        ],
        embeddedWallets:{
            createOnLogin:"all-users"
        },
        defaultChain: sepolia,
        supportedChains:[sepolia]
        
    }}
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>
        <SmartWalletsProvider>
        {children}
        </SmartWalletsProvider>
        </PrivyProvider>
}