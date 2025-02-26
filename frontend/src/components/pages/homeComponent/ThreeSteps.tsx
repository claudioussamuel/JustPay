import StepsCard from '@/components/content/StepsCard'
import { Heading } from '@/components/shared/Heading'



function ThreeSteps() {
  
  return (
      <div id="three-steps" className='border-zinc-800  border-t  border-b bg-wineTexture py-20'>
        <div className=' flex justify-center '>
          <Heading className='text-3xl text-center  text-zinc-800 pb-10 md:pb-20 md:text-6xl'>Let&apos;s get you started</Heading>
        </div>
        <div className='space-y-10 '>
          <StepsCard items={{
          foreGround: '/images/number-one.png',
          className: '',
          header: 'Create an Account ',
          body:'Sign up in minutes and get started right away.',
          themeOverride: "Blue",
          reverse: false,
          btnText: 'step-1'
        }}/>

<StepsCard items={{
          foreGround: '/images/number-2.png',
          header: ' Connect Your Wallet',
          body:'Easily link your existing crypto wallet or create a new one.',
          themeOverride: "Blue",
          className:'md:gap-52',
          reverse: true,
          btnText: 'step-2'
        }}/>

<StepsCard items={{
          foreGround: '/images/number-3.png',
          header: 'Send & Receive Stablecoins',
          body:'Enjoy instant, low-fee transactions worldwide.',
          themeOverride: "Blue",
          reverse: false,
          btnText: 'step-3'
        }}/>
        </div>
    </div>
  )
}

export default ThreeSteps
