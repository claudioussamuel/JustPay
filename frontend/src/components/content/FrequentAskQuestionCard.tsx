import clsx from 'clsx';
import React from 'react'
import { GoArrowDownRight } from "react-icons/go";

function FrequentAskQuestionCard({
  question, hovered}:{question:string; hovered:string}) {

  return (
    <div className='question-card-container font-dmMono mb-20 '>
      <div className="card">

      <div className='card-front grid p-5'>
        <div className="place-self-start ">
          <p className='text-wrap mt-3 flex '>{question}</p>
        </div>

        <div className='place-self-end '>
        <GoArrowDownRight className='text-5xl'/>
        </div>
      </div>

      <div className='card-back'>
          <p>{hovered}</p>
      </div>

      </div>
    </div>
  )
}

export default FrequentAskQuestionCard