"use client"

import { contactDevice, contactNumbers, contactPsync, contactShared } from '@/app/data'
import React, { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { IoSearchCircleOutline } from 'react-icons/io5'
import ContactData from './ContactData'
import { IoSendOutline } from "react-icons/io5";
import { GiReceiveMoney } from 'react-icons/gi'
import ContactInscription from '@/components/content/ContactInscription'
import { Calendar } from 'lucide-react'
import EventContact from './EventContact'
import { Button } from '@/components/ui/button'
import { useWallets } from '@privy-io/react-auth'
import { base } from 'viem/chains'
import { parseEther } from 'viem'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'
import Link from 'next/link'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { useUserContext } from '@/app/context/UserContext'



function ContactContent() {
    const {addUser} = useUserContext();

    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        xHandle: "",
        facebookHandle: "",
        igHandle: "",
        address: "",
        occupation: "",
      });


    const {wallets} = useWallets();
    const {toast} = useToast()

    const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {id,value} = e.target;
        setNewUser((prev)=>({...prev, [id]:value}))
    }

    const handleSave=()=>{
        addUser(newUser);
        setNewUser({
            firstName: "",
            lastName: "",
            xHandle: "",
            facebookHandle: "",
            igHandle: "",
            address: "",
            occupation: "",
          });
    }

  return (
    <div className='flex w-full h-auto font-dmMono bg-wineTexture  '>
        <div className='flex-[20%] border-r border-black bg-wineTexture gap-5'>
            <div className='grid grid-cols-1 text-zinc-800'>
                <div>
                    <h1 className='text-center py-3 text-2xl capitalize underline'>On this device</h1>

                    <div className='mx-3 space-y-3'>
                        {contactDevice.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='border border-t border-zinc-800 border-r-0 border-l-0 border-b-0'>
                    <h1>Psync Access</h1>
                    <div className='mx-3 space-y-3'>
                        {contactShared.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='border border-t border-zinc-800 border-r-0 border-l-0'>
                    <h1>Chromium</h1>
                    <div className='mx-3 space-y-3'>
                        {contactPsync.map((item,key)=>(
                            <div key={key} className='flex justify-between'>
                                <div>
                                    <h1>{item.title}</h1>
                                </div>
                                <div className='bg-zinc-800 p-1 w-5 h-5 rounded-[50%]'>
                                    <h1 className='text-white place-self-center text-[10px]'>{item.number}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='place-content-end mt-20 mx-3 mb-5'>
                    <Sheet>
                    <SheetTrigger asChild>
                        <Button className='bg-softBlend'>Add new contact</Button>  
                    </SheetTrigger>
                    <SheetContent className='text-zinc-800'>
        <SheetHeader>
          <SheetTitle>Add Users</SheetTitle>
          <SheetDescription>
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstName" className="text-right">
              FirstName
            </Label>
            <Input id="firstName" 
            value={newUser.firstName} 
            onChange={handleInputChange}
            className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastName" className="text-right">
              LastName
            </Label>
            <Input id="lastName" 
            value={newUser.lastName} 
            onChange={handleInputChange}
            className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="x" className="text-right">
              X
            </Label>
            <Input id="X" 
            value={newUser.xHandle} 
            onChange={handleInputChange}
            className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="facebookHandle" className="text-right">
              FaceBook
            </Label>
            <Input id="facebookHandle" 
            value={newUser.facebookHandle} 
            onChange={handleInputChange}
            className="col-span-3" />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="igHandle" className="text-right">
              Instagram
            </Label>
            <Input id="igHandle" 
            value={newUser.igHandle} 
            onChange={handleInputChange}
            className="col-span-3" />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input id="address"
             value={newUser.address}
             onChange={handleInputChange}
              className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="work" className="text-right">
              Occupation
            </Label>
            <Input id="work"
             value={newUser.occupation}
             onChange={handleInputChange}
              className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSave} className='bg-softBlend'>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
                    </Sheet>
                </div>

            </div>
        </div>

        <div className='flex-[20%] border-r border-black bg-wineTexture p-3'>
            <div className='text-zinc-800 mb-5'>
                <h1>Displayed contacts-117</h1>
                <div className='mx-10 flex justify-center border gap-5 items-center p-2 border-zinc-800 rounded-md'>
                    <IoSearchCircleOutline className='text-2xl'/>
                    <input className='outline-none bg-transparent placeholder:text-zinc-800' type="text" placeholder="Search"/>
                </div>
            </div>


            <div>
                {contactNumbers.map((data,index)=>(
                <ContactData data={data} key={index}/>
                ))}
            </div>
        </div>

        <div className='flex-[60%]'>
            <div className='flex flex-row gap-5'>
            <div className='flex-[50%] bg-softBlend border h-auto'>

                <div className='p-5 border bg-brand-beige m-5 rounded-md'>
                   <div className='flex gap-5'>

                   <div className="w-20 h-20 p-3 rounded-full font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
                     <h1 className="text-2xl text-white flex justify-center items-center text-nowrap">
                     <span className=''>C</span> <span className='text-nowrap'>K</span>
                    </h1>
                    </div>
                    <div>
                        <h1 className='text-2xl'>Claud Mensah</h1>
                        <div>
                            <p>Developer</p>
                        </div>

                        <div className='bg-brand-light p-1 w-20 rounded-md'>
                            <p className='text-center text-white text-[10px]'>Colleauge</p>
                        </div>
                    </div>
                   </div>
                   
                   <div className='mt-5 flex flex-row gap-5 justify-around text-white'>

                     <Link href="/payment">
                      <Button
                       className='hover:bg-none flex items-center gap-3 bg-brand-hue-color w-full justify-center py-2'>
                        <IoSendOutline/>
                        send
                        </Button>
                        </Link>

                      <div className='flex items-center gap-3 bg-green-400 w-full justify-center py-2'>receive
                        <GiReceiveMoney/>
                      </div>
                   </div>

                </div>

                <div className='p-5 space-y-3'>
                   <ContactInscription title='phone number' description='+233-548672'/>
                   <ContactInscription title='gmail' description='claudious@gmail.com'/>
                   <ContactInscription title='work' description='Blockchain Developer'/>
                   <ContactInscription title='X ' description='@codeClaus'/>
                   <ContactInscription title='Birthday' description='2nd March'/>
                </div>

            </div>


            <div className='flex-[50%] border h-auto border-black'>
                <div className='m-3'>
                <div className='flex flex-row items-center justify-between text-zinc-800 mb-5'>
                    <h1 className='text-[18px]'>Schedule events</h1>
                    <Calendar/>
                </div>
                <EventContact/>
            </div>

            </div>
            </div>

        </div>


    </div>
  )
}

export default ContactContent