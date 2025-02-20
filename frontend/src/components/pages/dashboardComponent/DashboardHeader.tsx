import { Input } from "@/components/ui/input"
import {  Bell, Search, Settings } from "lucide-react"
import Image from "next/image"


function DashboardHeader() {
  return (
    <div className="flex items-center  justify-between mr-10">
        <div className="flex items-center">
            <div>
            <Image src="/images/app-logo.png" width={100} height={100} alt="gee"/>
            </div>

            <div className="flex items-center p-1 gap-2 border border-zinc-800 rounded-md space-x-2 ">
                <Search className="text-zinc-800 ml-3"/>
                <Input className="bg-transparent border-0 outline-none shadow-none placeholder:text-zinc-800" placeholder="Search"/>
            </div>
        </div>

        <div className="flex items-center space-x-5 font-dmMono text-zinc-800">
            <Settings/>
            <Bell/>
            <div className="h-10 w-10 rounded-full bg-red-500">
                <h1 className="text-[18px] flex justify-center">CK</h1>
            </div>

            <div>
                <h1>0x03333.....</h1>
            </div>
        </div>
    </div>
  )
}

export default DashboardHeader