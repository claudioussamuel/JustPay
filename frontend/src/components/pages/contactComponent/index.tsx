import { Footer } from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import React from 'react'
import ContactContent from './ContactContent'

function ContactComponent() {
  return (
    <div>
        <Header/>
        <ContactContent/>
        <Footer/>
    </div>
  )
}

export default ContactComponent