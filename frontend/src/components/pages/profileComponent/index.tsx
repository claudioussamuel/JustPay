"use client"

import Image from 'next/image'
import React, { useState } from 'react'
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
import {useFundWallet} from '@privy-io/react-auth';
import {useWallets} from '@privy-io/react-auth';
import { base, sepolia } from 'viem/chains';
import { createWalletClient, getContract } from 'viem';
import { custom } from 'viem';
import { pinata } from '@/lib/pinanta';

import { contractAbi, contractAddress } from "@/lib/integrations/viem/abi";

function ProfileContent() {

    const {login, authenticated,ready, user,logout,} = usePrivy()
    const walletAddress = user?.wallet?.address;
    
    const { wallets} = useWallets();
    const {fundWallet} = useFundWallet();



    // User State
    const [users, setUser] = useState({
        firstName: "Felicia",
        lastName: "Asaglo",
        email: "feliaciafegs@gmail.com",
        phone: "+2332486235500",
        city: "Accra",
        gender: "Female",
        dob: "21st June 2003",
        address: "Prestia Hunivali",
        profilePic: "/images/v4.jpg"
    });

    const [tempUser, setTempUser] = useState({ ...users });
    const [newProfilePic, setNewProfilePic] = useState(null);

    // Handle input change
    const handleChange = (e:any) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    async function addUserDataToTheBlocChain(/**Add them here */){
    //         string firstName;
    //         string lastName;
    //         string gender;
    //         string dateOfBirth;
    //         string homeTown;
    //         string gmail;
    //         string telephone;
    //         string country;
    //         string imageUrl;
    //         bool hasName;
    //         string xHandle;
    //         string facebookHandle;
    //         string igHandle;
        const wallet = wallets[0];
        const provider = await wallet.getEthereumProvider();

        const client = createWalletClient({
            chain: sepolia,
            transport: custom(provider),
            account:`${walletAddress}` as `0x${string}`
          });

          /**Uncomment This one*/
          const contract = getContract({
            address: contractAddress,
            abi:contractAbi,
            client,
          });

           await contract.write.addName([ "","","","","","","","","","","",""/**Add the parameters here too */])
    }

    // Handle save changes
    const handleSave = async ()  => {
        setUser(tempUser);
       await addUserDataToTheBlocChain();
    };


    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
             // Generate URL for the image
            const response = await pinata.upload.file(file);
           
            const ipfsHash = response.IpfsHash;
            // const imageURL = URL.createObjectURL(file);
            const imageURL = `https://ipfs.io/ipfs/${ipfsHash}`;
            // Update the user state with the new profile picture URL
            setUser((prevUser) => ({
                ...prevUser, 
                profilePic: imageURL
            }));
        }
    };
    return (
      <div className="mx-10 mb-20">
        <div className="flex gap-20 -mt-5 z-50 relative h-auto ">

          <div className="flex-[40%] border border-black bg-softBlend font-dmMono text-white ">
            <div className='flex justify-center items-center py-5'>
                <label htmlFor="profile-pic" className='cursor-pointer'>
                    <Image 
                        src={newProfilePic || users.profilePic} 
                        alt="profile" 
                        className='rounded-2xl w-[70%] object-cover h-[30vh]' 
                        width={350} 
                        height={100}
                        unoptimized
                    />
                </label>
                <input type="file" id="profile-pic" className="hidden" onChange={handleImageUpload} />
            </div>

            <h3 className='text-center text-5xl font-bowlby'>{users.firstName} {users.lastName}</h3>
            <div className='grid place-content-center space-y-3 mt-2 mb-5'>
                <div className='flex gap-5 items-center'>
                    <GrLocationPin className='text-2xl'/>
                    <h1>{users.address}</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <CgMailOpen className='text-2xl'/>
                    <h1>{users.email}</h1>
                </div>
                <div className='flex gap-5 items-center'>
                    <BsTelephone className='text-2xl'/>
                    <h1>{users.phone}</h1>
                </div>
            </div>
          </div>

          {/* Account Details with Sheet Modal */}
          <div className="flex-[60%] border border-black bg-softBlend text-zinc-800 p-5 font-dmMono">
            <h3 className='text-3xl'>Account details</h3>
            <div className='text-2xl mt-5 space-y-5'>
                <div className='flex justify-between'>
                    <div className='flex gap-5 items-center'><MdOutlinePersonOutline/><h3>First Name</h3></div>
                    <h3>{users.firstName}</h3>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-5 items-center'><MdPersonAddAlt/><h3>Last Name</h3></div>
                    <h3>{users.lastName}</h3>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-5 items-center'><SlCalender/><h3>Date of Birth</h3></div>
                    <h3>{users.dob}</h3>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-5 items-center'><BsGenderAmbiguous/><h3>Gender</h3></div>
                    <h3>{users.gender}</h3>
                </div>
            </div>

            {/* Edit Modal */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button className='mt-5 flex items-center gap-2'><CiEdit/> Edit</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Edit Profile</SheetTitle>
                        <SheetDescription>Modify your profile details below.</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-2">
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
                    </div>

                    <SheetFooter className='mt-3'>
                        <SheetClose asChild>
                            <Button onClick={handleSave}>Save</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
          </div>
        </div>



        <div className='mt-10 border border-black bg-softBlend h-auto rounded-2xl text-zinc-800 p-5'>
            <div className='flex items-center justify-between mx-10'>
                <h3 className='text-2xl font-bowlby'>Personal Information</h3>

            </div>

            <div className='max-w-2xl mt-2  font-dmMono'>
                 <div className='flex justify-between'>
                    <h1>FirstName</h1>
                    <h1>LastName</h1>
                 </div>

                 <div className='flex justify-between mb-2'>
                    <h1>Felecia</h1>
                    <h1>Azaglo</h1>
                 </div>

                 <div className='flex justify-between'>
                    <h1>Email Address</h1>
                    <h1>Phone</h1>
                 </div>
                 <div className='flex justify-between'>
                    <h1>felecia@gmail.com</h1>
                    <h1>(+233-02486000243)</h1>
                 </div>
            </div>
        </div>


        <div className='mt-10 border border-black bg-softBlend h-auto rounded-2xl text-zinc-800 p-5'>
            <div className='flex items-center justify-between mx-10'>
                <h3 className='text-2xl font-bowlby'>Address</h3>

            </div>

            <div className='max-w-2xl mt-2 font-dmMono'>
                 <div className='flex justify-between'>
                    <h1>Country</h1>
                    <h1>City</h1>
                 </div>

                 <div className='flex justify-between mb-2'>
                    <h1>Ghana</h1>
                    <h1>Accra</h1>
                 </div>

                 <div className='flex justify-between'>
                    <h1>Postal Code</h1>
                    <h1>TAX ID</h1>
                 </div>
                 <div className='flex justify-between'>
                    <h1>ERT 62574</h1>
                    <h1>As56417869</h1>
                 </div>
            </div>
        </div>


      </div>
    );
}

export default ProfileContent;
