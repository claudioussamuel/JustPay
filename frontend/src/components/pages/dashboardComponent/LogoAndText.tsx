import React from 'react';

interface LogoAndTextProps {
  Icon: React.ReactNode;
  text: string;
}

function LogoAndText({ Icon, text }: LogoAndTextProps) {
  return (
    <div className='flex items-center gap-3 font-dmMono'>
      {Icon}
      <span>{text}</span> 
    </div>
  );
}

export default LogoAndText;