"use client"
import React from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SendPayment from './SendPayment'
import RequestPayment from './RequestPayment'
import Bounded from '@/components/shared/Bounded'


function PaymentContent() {
  return (
 <div>
 <Tabs defaultValue="send">
  <TabsList className='  grid grid-cols-2 gap-5 font-dmMono'>
    <TabsTrigger value="send" className='text-2xl'>send</TabsTrigger>
    <TabsTrigger value="receive" className='text-2xl'>request</TabsTrigger>
  </TabsList>

  <TabsContent value="send" className='mt-10'>
      <SendPayment/>
    </TabsContent>

  <TabsContent value="receive" className='mt-10'>
        <RequestPayment/>
    </TabsContent>
</Tabs>

    </div>
  )
}

export default PaymentContent