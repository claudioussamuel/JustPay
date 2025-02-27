import React from 'react'

type Props = {
    title:string;
    description:string | number 
}

function ContactInscription({ title, description }: Props) {
  return (
    <div className="border py-5 rounded-2xl px-3">
      <h1 className='font-extrabold'>{title}</h1>
      <p className="overflow-wrap break-words text-[12px]  lg:text-nowrap lg:text-[18px]">{description}</p>
    </div>
  );
}

export default ContactInscription