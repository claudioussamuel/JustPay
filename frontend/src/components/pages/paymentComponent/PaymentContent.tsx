"use client"
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AcceptOrDecline from './AcceptOrDecline'
import SendPayment from './SendPayment'
import RequestPayment from './RequestPayment'


function PaymentContent() {
  return (
 <div>
 <Tabs defaultValue="send">
  <TabsList className='  grid grid-cols-3 gap-5 font-dmMono'>
    <TabsTrigger value="send" className='text-2xl'>send</TabsTrigger>
    <TabsTrigger value="receive" className='text-2xl'>request</TabsTrigger>
    <TabsTrigger value="accept" className='text-2xl'>accept/decline</TabsTrigger>
  </TabsList>

  <TabsContent value="send" className='mt-10'>
      <SendPayment/>
    </TabsContent>

  <TabsContent value="receive" className='mt-10'>
        <RequestPayment/>
    </TabsContent>

    <TabsContent value="accept" className='mt-10'>
        <AcceptOrDecline/>
    </TabsContent>
</Tabs>

    </div>
  )
}

export default PaymentContent