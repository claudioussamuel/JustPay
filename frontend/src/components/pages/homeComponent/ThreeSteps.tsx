import StepsCard from '@/components/content/StepsCard'
import { Heading } from '@/components/shared/Heading'


function ThreeSteps() {
  return (
      <div className='border-zinc-800  border-t  border-b bg-wineTexture py-20'>
        <div className=' flex justify-center '>
          <Heading className='text-6xl text-zinc-800 pb-20'>Let&apos;s get you started</Heading>
        </div>
        <div className='space-y-10 '>
          <StepsCard items={{
          foreGround: '/images/number-one.png',
          className: '',
          header: 'register to the site',
          body:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non natus fuga eaque ipsum consequuntur! Velit quas dolore illo dicta sed',
          themeOverride: "Blue",
          reverse: false,
          btnText: 'step-1'
        }}/>

<StepsCard items={{
          foreGround: '/images/number-2.png',
          header: 'Send recipienct code',
          body:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non natus fuga eaque ipsum consequuntur! Velit quas dolore illo dicta sed',
          themeOverride: "Blue",
          className:'gap-52',
          reverse: true,
          btnText: 'step-2'
        }}/>

<StepsCard items={{
          foreGround: '/images/number-3.png',
          header: 'confirm payment!!!',
          body:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non natus fuga eaque ipsum consequuntur! Velit quas dolore illo dicta sed',
          themeOverride: "Blue",
          reverse: false,
          btnText: 'step-3'
        }}/>
        </div>
    </div>
  )
}

export default ThreeSteps
