import React from 'react'
import Image from 'next/image'

export function JustText() {
  return (
    <div className='container-frame font-bowlby uppercase'>
      <div className='text' style={{ "--j": 0} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>j</span>
        <span style={{"--i":1} as React.CSSProperties}>j</span>
        <span style={{"--i":2} as React.CSSProperties}>j</span>
        <span style={{"--i":3} as React.CSSProperties}>j</span>
      </div>

      <div className='text' style={{ "--j": 1} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>u</span>
        <span style={{"--i":1} as React.CSSProperties}>u</span>
        <span style={{"--i":2} as React.CSSProperties}>u</span>
        <span style={{"--i":3} as React.CSSProperties}>u</span>
      </div>

      <div className='text' style={{ "--j": 2} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>s</span>
        <span style={{"--i":1} as React.CSSProperties}>s</span>
        <span style={{"--i":2} as React.CSSProperties}>s</span>
        <span style={{"--i":3} as React.CSSProperties}>s</span>
      </div>

      <div className='text' style={{ "--j": 3} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>t</span>
        <span style={{"--i":1} as React.CSSProperties}>t</span>
        <span style={{"--i":2} as React.CSSProperties}>t</span>
        <span style={{"--i":3} as React.CSSProperties}>t</span>
      </div>

    </div>
  )
}


export function PayText() {
  return (
    <div className='container-frame font-dmMono uppercase'>
      <div className='text' style={{ "--j": 0} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>p</span>
        <span style={{"--i":1} as React.CSSProperties}>p</span>
        <span style={{"--i":2} as React.CSSProperties}>p</span>
        <span style={{"--i":3} as React.CSSProperties}>p</span>
        <Image style={{"--i":4} as React.CSSProperties} src="/images/" alt="money" width={100} height={100}/>
      </div>

      <div className='text' style={{ "--j": 1} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>a</span>
        <span style={{"--i":1} as React.CSSProperties}>a</span>
        <span style={{"--i":2} as React.CSSProperties}>a</span>
        <span style={{"--i":3} as React.CSSProperties}>a</span>
      </div>

      <div className='text' style={{ "--j": 2} as React.CSSProperties}>
        <span style={{"--i":0} as React.CSSProperties}>y</span>
        <span style={{"--i":1} as React.CSSProperties}>y</span>
        <span style={{"--i":2} as React.CSSProperties}>y</span>
        <span style={{"--i":3} as React.CSSProperties}>y</span>
      </div>


    </div>
  )
}