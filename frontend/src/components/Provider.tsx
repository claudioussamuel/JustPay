"use client"
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({children}:{children:ReactNode}){
    return <PrivyProvider 
    config={{
        loginMethods:[
            "wallet",
            "email",
            "github",
            "apple",
            "tiktok",
            "telegram",
            "sms",
            "twitter",
            "discord",
            "spotify",
            "google",
            "instagram",
            "linkedin"
        ],
        embeddedWallets:{
            createOnLogin:"users-without-wallets"
        }
        
    }}
    appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}>
        {children}
        </PrivyProvider>
}