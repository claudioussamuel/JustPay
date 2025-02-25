import { Button } from '@/components/ui/button'
import { Calendar, Hash, Link, Mail, User } from 'lucide-react'
import React from 'react'
import LogoAndText from './LogoAndText'
import { BsQuestionOctagon } from 'react-icons/bs'
import {  transactions } from '@/app/data'
import TransactionContent from './TransactionContent'
import { BiChevronDown } from 'react-icons/bi'

function DashbaordInfo() {
  return (
    <div className='w-[80%] grid  place-self-center    text-zinc-800 -mt-16'>
        <div className='flex gap-10'>

            <div className='text-zinc-800 flex-[60%]  p-5 space-y-5' >

                 <div className='w-full border border-white rounded-md bg-softBlend'>
                    <div className='flex justify-between p-3'>
                        <div className='flex items-center space-x-3 text-[18px] font-dmMono'>
                            <h1>Balance</h1>
                            <h2>0xFFFFF</h2>
                            <h1>for</h1>
                            <h1 className='text-3xl font-bowlby'>$250.65</h1>
                        </div>

                        <div className='flex items-center text-[18px] space-x-3 font-dmMono'>
                            <Link/>
                             <h1>copy</h1>
                        </div>
                    </div>

                    <div className='pl-3 flex items-center gap-5'>
                        <div className='w-20 bg-wineTexture  rounded-md font-dmMono '>
                            <h1 className='text-[15px] text-zinc-800 flex justify-center'>Open</h1>
                        </div>

                        <div className='font-dmMono text-[20px] font-bold'>
                            <h1>Due animonity</h1>
                        </div>
                    </div>

                    <div className='pl-3 py-5 space-x-5 flex font-dmMono'>
                     
                    <div className='bg-wineTexture rounded-md'>
                        <Button className=' text-zinc-800 text-[18px] capitalize font-dmMono'>Share Info</Button>
                    </div>

                    <div className='bg-wineTexture rounded-md'>
                        <Button className=' text-zinc-800 text-[18px] capitalize font-dmMono'>Fall suite</Button>
                    </div>


                     <div className='bg-wineTexture rounded-md'>
                        <Button className=' text-zinc-800 text-[18px] capitalize font-dmMono'>Offload</Button>
                    </div>

                    </div>
                 </div>

                <div className='border p-3 rounded-md bg-softBlend'>
                    <h1 className='font-bowlby text-2xl mb-3'>All contacts</h1>

                    <div className='grid grid-cols-2 gap-5 font-dmMono'>
                    {/* {contactNumbers.map((data,index)=>(
                         <ContactData className='text-white' data={data} key={index}/>
                     ))} */}
                    </div>
                </div>

                <div className='bg-softBlend p-3 rounded-md'>
                <div className='flex justify-between items-center p-3 font-dmMono bg-softBlend text-2xl'>
              <div>
                <h2>Latest Transcations</h2>
              </div>

              <div className='flex items-center space-x-2'>
                <h1>Results</h1>
              <BiChevronDown className='text-3xl text-white'/>
              </div>
            </div>


                
                {transactions.map(({walletAddress,date,completed,ratings},index)=>(
                <TransactionContent
                     key={index}
                  walletAddress={walletAddress} 
                     date={date} completed={completed}
                  ratings={ratings} />
                ))}
                </div>

            </div>

             <div className='text-zinc-800 flex-[40%] p-5 space-y-5'>
                <div className='h-auto  mx-5 border rounded-md p-3 bg-softBlend space-y-3 '>
                    <h1 className='text-2xl font-bold font-dmMono'>Details</h1>

                    <div className='space-y-3 text-[15px]'>
                    <LogoAndText Icon={<User/>} text='Claudios Mensah'/>
                    <LogoAndText Icon={<Mail/>} text='Mandem@gmail.com'/>
                    <LogoAndText Icon={<Mail/>} text='Mandem@gmail.com'/>
                    <LogoAndText Icon={<Calendar/>} text='Aug 5, 3:16AM'/>
                    <LogoAndText Icon={<Hash/>} text='#2486111'/>

                    </div>

                    <div className='bg-wineTexture rounded-md '>
                        <Button className='w-full text-zinc-800 font-dmMono'>Invoice PDF</Button>
                    </div>
                </div>

                <div className='text-zinc-800 flex-[40%]  '>
                <div className='h-auto  mx-5 border rounded-md p-3 space-y-5 bg-softBlend'>
                    <BsQuestionOctagon className='text-4xl'/>
                    <h1 className='text-2xl font-bold font-dmMono'>Ask us</h1>
                    <div className='text-[15px] font-dmMono'>
                     <p>Lorem ipsum dolor sit amet consectetur,
                         adipisicing elit. Sed, dolore! Facilis at expedita cum in.</p>
                    </div>

                    <div className='bg-wineTexture rounded-md'>
                        <Button className='w-full text-zinc-800 text-[18px] capitalize font-dmMono'>ask a question</Button>
                    </div>
                </div>
            </div>
            </div>
        </div>

    </div>
  )
}

export default DashbaordInfo