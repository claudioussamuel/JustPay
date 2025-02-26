"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { GrLocationPin } from "react-icons/gr";
import { CgMailOpen } from "react-icons/cg";
import { BsTelephone } from "react-icons/bs";
import { MdOutlinePersonOutline, MdPersonAddAlt } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { BsGenderAmbiguous } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { usePrivy } from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';
import { createWalletClient, getContract } from 'viem';
import { custom } from 'viem';
import { pinata } from '@/lib/pinanta';


import { contractAbi, contractAddress } from "@/lib/integrations/viem/abi";
import { readContractData } from '@/lib/integrations/viem/contract';
import { UserData } from '../../../../types/global.types';

function ProfileContent() {

    const { user,} = usePrivy()
    const walletAddress = user?.wallet?.address;
    
    const { wallets} = useWallets();
 


    const [users, setUser] = useState({
        firstName: "...",  
        lastName: "....",  
        email: "...",
        phone: "...",
        city: "...",
        gender: "...",  
        dob: "...", 
        address: "...", 
        profilePic: "/images/v4.jpg", 
        xHandle:"...",
        igHandle:"...", 
        facebookHandle:"..." 
    });

 
    useEffect(() => {
        const fetchUserData = async () => {
            if (walletAddress) {
                const data = await readContractData(`${walletAddress}` as `0x${string}`);
                if (data) {
                    const [
                        firstName, 
                        lastName, 
                        gender, 
                        dateOfBirth, 
                        imageUrl,
                        xHandle,
                        facebookHandle,
                        igHandle,
                        location,
                        email,
                        phone,
                        hasName
                    ] = data;

              
                    setUser(prev => ({
                        ...prev,
                        firstName: firstName || "...",
                        lastName: lastName || "...",
                        gender: gender || "...",
                        dob: dateOfBirth || "...",
                        profilePic: imageUrl || "/images/v4.jpg",
                        xHandle:xHandle || "...",
                        facebookHandle: facebookHandle || "...",
                        igHandle: igHandle || "...",
                        address: location || "...",
                        email: email || "...",
                        phone: phone || "...",
                        hasName: hasName || false
                    }));
                }
            }
        };

        fetchUserData();
    }, [walletAddress]);


    useEffect(() => {
        setTempUser({ ...users });
    }, [users]);


    const [tempUser, setTempUser] = useState({ ...users });
    const [newProfilePic] = useState(null);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };


    async function addUserDataToTheBlocChain(userData: UserData) {
        try {
            if (!wallets || wallets.length === 0) {
                console.error("No wallet connected");
                return;
            }

            const wallet = wallets[0];
            if (!wallet) {
                console.error("Wallet is undefined");
                return;
            }

            const provider = await wallet.getEthereumProvider();
            if (!provider) {
                console.error("Provider is undefined");
                return;
            }

            const currentChainId = await provider.request({ method: "eth_chainId" });

            if (currentChainId !== `0x${sepolia.id.toString(16)}`) {
                await wallet.switchChain(sepolia.id);
            }

            const client = createWalletClient({
                chain: sepolia,
                transport: custom(provider),
                account: walletAddress as `0x${string}`,
            });

            const contract = getContract({
                address: contractAddress,
                abi: contractAbi,
                client,
            });

            await contract.write.addName([
                userData.firstName,
                userData.lastName,
                userData.gender,
                userData.dob,
                userData.profilePic,
                userData.xHandle,
                userData.facebookHandle,
                userData.igHandle,
                userData.address,
                userData.email,
                userData.phone,
            ]);
          
            console.log("User data added to the blockchain");
        } catch (error) {
            console.error("Failed to update blockchain:", error);
        }
    }

    const handleSave = async ()  => {
        setUser(tempUser);
       await addUserDataToTheBlocChain(tempUser);
    };


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {

            const response = await pinata.upload.file(file);
           
            const ipfsHash = response.IpfsHash;
          
            const imageURL = `https://ipfs.io/ipfs/${ipfsHash}`;

            console.log(`Kenny ${imageURL}`)
            setUser((prevUser) => ({
                ...prevUser, 
                profilePic: imageURL,
                imageURL
            }));
        }
    };
    return (
      <div className=" md:mx-10 mb-20">
        <div className="flex flex-col   lg:flex-row gap-20 -mt-5 z-50 relative h-auto ">

          <div className=" md:flex-[40%] border border-black bg-softBlend font-dmMono text-white ">
            <div className='flex justify-center items-center py-5'>
                <label htmlFor="profile-pic" className='cursor-pointer'>
                    <Image 
                        src={newProfilePic || users.profilePic} 
                        alt="profile" 
                        className='rounded-2xl  place-self-center  object-cover w-32 h-32 ' 
                        width={350} 
                        height={100}
                        unoptimized
                    />
                </label>
                <input type="file" id="profile-pic" className="hidden" onChange={handleImageUpload} />
            </div>

            <h3 className='text-center text-2xl md:text-5xl font-bowlby'>{users.firstName} {users.lastName}</h3>
            <div className='grid place-content-center space-y-3 mt-2 mb-5'>
                <div className='flex gap-5 items-center'>
                    <GrLocationPin className='text-[15px] md:text-2xl'/>
                    <h1>{users.address}</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <CgMailOpen className='text-[15px] md:text-2xl'/>
                    <h1>{users.email}</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <BsTelephone className='text-[15px] md:text-2xl'/>
                    <h1>{users.phone}</h1>
                </div>
            </div>
          </div>


          <div className="md:flex-[60%] border border-black bg-softBlend text-zinc-800 p-5 font-dmMono">
            <h3 className='text-center font-bold md:text-3xl'>Account details</h3>
            <div className='text-2xl mt-5 space-y-5'>

                <div className='flex  text-[14px] font-bold md:text-[18px] md:flex-row justify-between'>
                    <div className='flex gap-5 items-center'><MdOutlinePersonOutline/><h3>First Name</h3></div>
                    <h3>{users.firstName}</h3>
                </div>

                <div className='flex  text-[14px] font-bold md:text-[18px] md:flex-row justify-between'>
                    <div className='flex gap-5 items-center'><MdPersonAddAlt/><h3>Last Name</h3></div>
                    <h3>{users.lastName}</h3>
                </div>
                <div className='flex   text-[14px] font-bold md:text-[18px] md:flex-row justify-between'>
                    <div className='flex gap-5 items-center'><SlCalender/><h3>Date of Birth</h3></div>
                    <h3>{users.dob}</h3>
                </div>
                <div className='flex   text-[14px] font-bold md:text-[18px] md:flex-row justify-between'>
                    <div className='flex gap-5 items-center'><BsGenderAmbiguous/><h3>Gender</h3></div>
                    <h3>{users.gender}</h3>
                </div>
            </div>

          
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='mt-5 bg-black flex items-center gap-2'><CiEdit/> Edit</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>Modify your profile details below.</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-2 text-zinc-800">
                        <div className='mb-3'>
                        <Label>First Name</Label>
                        <Input className="pb-3" name="firstName" value={tempUser.firstName} onChange={handleChange} />
                        </div>


                        <div className='mb-3'>
                        <Label>Last Name</Label>
                        <Input className="pb-3" name="lastName" value={tempUser.lastName} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>Date of Birth</Label>
                        <Input className="pb-3" name="dob" value={tempUser.dob} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>Gender</Label>
                        <Input className="pb-3" name="gender" value={tempUser.gender} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>X</Label>
                        <Input className="pb-3" name="xHandle" value={tempUser.xHandle} onChange={handleChange} />
                        </div>


                        <div className='mb-3'>
                        <Label>Email</Label>
                        <Input className="pb-3" name="email" value={tempUser.email} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>Phone</Label>
                        <Input className="pb-3" name="phone" value={tempUser.phone} onChange={handleChange} />
                        </div>


                        <div className='mb-3'>
                        <Label>Facebook</Label>
                        <Input className="pb-3" name="facebookHandle" value={tempUser.facebookHandle} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>Instagram</Label>
                        <Input className="pb-3" name="igHandle" value={tempUser.igHandle} onChange={handleChange} />
                        </div>

                        <div className='mb-3'>
                        <Label>Address</Label>
                        <Input className="pb-3" name="address" value={tempUser.address} onChange={handleChange} />
                        </div>

                    </div>

                    <SheetFooter className='mt-3'>
                        <SheetClose asChild>
                            <Button className='bg-black' onClick={handleSave}>Save</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
          </div>

        </div>



        <div className='mt-10 border border-black bg-softBlend h-auto rounded-2xl text-zinc-800 p-5'>
            <div className='flex w-full items-center justify-center '>
                <h3 className=' text-[18px] md:text-2xl font-bowlby'>Personal Information</h3>
            </div>

            <div className='max-w-2xl mt-2  font-dmMono'>
                 <div className='flex justify-between'>
                    <h1>FirstName</h1>
                    <h1>LastName</h1>
                 </div>

                 <div className='flex justify-between mb-2'>
                    <h1>{users.firstName}</h1>
                    <h1>{users.lastName}</h1>
                 </div>

                 <div className='flex justify-between'>
                    <h1>Email Address</h1>
                    <h1>Phone</h1>
                 </div>
                 <div className='flex justify-between'>
                    <h1>{users.email}</h1>
                    <h1>{users.phone}</h1>
                 </div>
            </div>
        </div>


        <div className='mt-10 border border-black bg-softBlend h-auto rounded-2xl text-zinc-800 p-5'>
            <div className='flex items-center justify-between mx-10'>
                <h3 className='text-2xl font-bowlby'>Address</h3>

            </div>

            <div className='max-w-2xl mt-2 font-dmMono'>
                 <div className='flex justify-between'>
                    <h1>X</h1>
                    <h1>Facebook</h1>
                 </div>

                 <div className='flex justify-between mb-2'>
                    <h1>{users.xHandle}</h1>
                    <h1>{users.facebookHandle}</h1>
                 </div>

                 <div className='flex justify-between'>
                    <h1>Instagram</h1>
                    <h1>Address</h1>
                 </div>
                 <div className='flex justify-between'>
                    <h1>{users.igHandle}</h1>
                    <h1>{users.address}</h1>
                 </div>
            </div>
        </div>


      </div>
    );
}

export default ProfileContent;