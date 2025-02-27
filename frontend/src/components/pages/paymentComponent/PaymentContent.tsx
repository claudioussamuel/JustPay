"use client"
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AcceptOrDecline from './AcceptOrDecline'
import SendPayment from './SendPayment'
import RequestPayment from './RequestPayment'
import { useRouter, useSearchParams } from 'next/navigation'



export function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get('tab') || 'send';
  const wallet = searchParams.get("wallet") || "";

  return (
    <div>
      <Tabs defaultValue={currentTab} onValueChange={(value) => router.push(`/payment?tab=${value}&wallet=${wallet}`)}>
        <TabsList className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 font-dmMono w-52 md:w-full lg:w-full'>
          <TabsTrigger value="send" className='text-[12px] lg:text-2xl'>send</TabsTrigger>
          <TabsTrigger value="receive" className='text-[12px] lg:text-2xl'>request</TabsTrigger>
          <TabsTrigger value="accept" className='text-[12px] lg:text-2xl'>accept/decline</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className='mt-10'>
          <SendPayment />
        </TabsContent>

        <TabsContent value="receive" className='mt-10'>
          <RequestPayment />
        
        </TabsContent>

        <TabsContent value="accept" className='mt-10'>
          <AcceptOrDecline />
        </TabsContent>
      </Tabs>
    </div>
  );
}