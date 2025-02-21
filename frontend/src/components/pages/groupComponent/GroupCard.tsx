"use client";
import React, { useState } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaRegMessage } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiPathFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";

type GroupTypes = {
  data: {
    requestor:string;
    amount:bigint;
    message:string;
    name:string;
    stableCoin:string;
    time:bigint;
  };
};
 
function truncateAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`; 
}
function GroupCard({ data }: GroupTypes) {
  const [showToggle, setShowToggle] = useState(false);

  const toggleAction = () => {
    setShowToggle((prevState) => !prevState);
  };

  // Generate avatar fallback from initials
  const avatarFallback = `${data.name[0]}`;

  return (
    <div className="w-80 border rounded-lg p-3 border-zinc-800 font-dmMono bg-softBlend relative hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src="https://pyxis.nymag.com/v1/imgs/b1c/bb1/f34eb12e99381d8dbef2aee125da6970d1-NICKELODEON-AVATAR-313-204644-1920x1080.rhorizontal.w700.jpg" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">
              {truncateAddress(data.requestor)} 
            </h1>
            <p className="text-sm ">{(Number(data.amount)/1e18).toFixed(2)} USD</p>
          </div>
        </div>
        <PiDotsThreeOutlineFill
          onClick={toggleAction}
          className="text-3xl cursor-pointer hover:text-zinc-600 transition-colors duration-200"
        />
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gray-400 mt-2" />

      {/* Details Section */}
      <div className="pt-3 space-y-3">
        <div className="flex items-center gap-2">
          <FaRegMessage className="text-white" />
          <h3 className="text-sm">{data.message}</h3>
        </div>

        <div className="flex items-center gap-2">
          <MdAlternateEmail className="text-white" />
          <h3 className="text-sm">{data.name}</h3>
        </div>

        <div className="flex items-center gap-2">
          <PiPathFill className="text-white" />
          <h3 className="text-sm">{  new Date(Number(data.time) * 1000).toLocaleString()  }</h3>
        </div>
      </div>


      {showToggle && (
        <div className="absolute top-12 right-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2 z-50 animate-fade-in">
          <Button
            variant="default"
            className="w-full text-green-700 transition-colors duration-200"
          >
            Approved
          </Button>
          <Button
            variant="default"
            className="w-full text-red-700 transition-colors duration-200"
          >
            Decline
          </Button>
        </div>
      )}
    </div>
  );
}

export default GroupCard;