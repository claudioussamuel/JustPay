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
    firstName: string;
    lastName: string;
    gmail: string;
    number: string;
    date: string;
    pathner: string;
  };
};

function GroupCard({ data }: GroupTypes) {
  const [showToggle, setShowToggle] = useState(false);

  const toggleAction = () => {
    setShowToggle((prevState) => !prevState);
  };

  const avatarFallback = `${data.firstName[0]}${data.lastName[0]}`;

  return (
    <div className="w-80 border rounded-lg p-3 border-zinc-800 font-dmMono bg-softBlend relative hover:shadow-lg transition-shadow duration-300">

      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
          <Avatar>
            <AvatarImage src="https://pyxis.nymag.com/v1/imgs/b1c/bb1/f34eb12e99381d8dbef2aee125da6970d1-NICKELODEON-AVATAR-313-204644-1920x1080.rhorizontal.w700.jpg" />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">
              {data.firstName} {data.lastName}
            </h1>
            <p className="text-sm ">{data.date}</p>
          </div>
        </div>
        <PiDotsThreeOutlineFill
          onClick={toggleAction}
          className="text-3xl cursor-pointer hover:text-zinc-600 transition-colors duration-200"
        />
      </div>


      <div className="h-[2px] w-full bg-gray-400 mt-2" />

     
      <div className="pt-3 space-y-3">
        <div className="flex items-center gap-2">
          <FaRegMessage className="text-white" />
          <h3 className="text-sm">{data.number}</h3>
        </div>

        <div className="flex items-center gap-2">
          <MdAlternateEmail className="text-white" />
          <h3 className="text-sm">{data.gmail}</h3>
        </div>

        <div className="flex items-center gap-2">
          <PiPathFill className="text-white" />
          <h3 className="text-sm">{data.pathner}</h3>
        </div>
      </div>


      {showToggle && (
        <div className="absolute top-12 right-3 bg-white border border-gray-200 rounded-lg shadow-lg p-3 space-y-2 z-50 animate-fade-in">
          <Button
            className="w-full text-green-700 transition-colors duration-200"
          >
            Approved
          </Button>
          <Button
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