import Bounded from "../../shared/Bounded"

function HugeText() {
    return (
     <Bounded className="border mx-10 py-10 border-t-0 border-b-0">
      <div className=' text-[0.8rem] flex flex-col w-full border-t border-b border-l border-r border-white  md:text-[3rem] lg:text-[4.5rem] '>
         <div className='grid grid-cols-3 border-b border-white text-white '>
           <div className='uppercase font-bold pl-10 font-dmMono'>
             <h1>payments</h1>
            </div> 
  
            <div className='border-l border-white pl-5'>
             <h1 className='font-allura uppercase font-playWright'>made</h1>
            </div> 
  
            <div className='border-l  border-white '>
             <h1 className='font-bold font-dmMono uppercase pl-10'>easy</h1>
            </div> 
         </div>
  
         <div className='flex flex-row text-white'>
           <div className='flex-shrink-0 w-50 border-r border-white '>
            <h1 className=' text-center uppercase font-playWright px-10 '>across</h1>
           </div>
  
           <div className='border-r border-white  flex-grow'>
            <h1 className='pl-10 font-dmMono uppercase font-bold'>the</h1>
           </div>
  
           <div className='flex-grow'>
            <h1 className='  uppercase pl-10 font-playWright' >Globe!</h1>
           </div>
         </div>
      </div>
     </Bounded>
    )
  }
  
  export default HugeText