import React from 'react'

type Props = {
    title:string;
    description:string | number 
}

function ContactInscription({title,description}: Props) {
  return (
    <div className='border py-5 rounded-2xl px-3'>
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
  )
}

export default ContactInscription