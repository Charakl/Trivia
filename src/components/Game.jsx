import React, { useEffect, useState } from 'react'
import Countdown from './Countdown';


const Game = () => {


  


  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayStartButton, setDisplayStartButton] = useState(true);
  const [displayAnswer, setDisplayAnswer] = useState(false);

  const display = () => {
    setDisplayQuestion(true);
    setDisplayStartButton(false);
  }

  return (
    <div>
      <div className='m-auto border-4 border-black w-[800px] flex flex-col items-center'>
        <h2 className='text-[30px]'>Team 1</h2>
        {displayStartButton &&
          <button onClick={display} className='m-auto duration-[0.4s] hover:bg-[#002855] hover:text-[#F7C548] mt-8 mb-8 border-2 border-[#002855] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Start</button>
        }
        {displayQuestion &&
          <div>
            <Countdown />
            <div>Question 1</div>
            <button onClick={() => setDisplayAnswer(true)} className='m-auto duration-[0.4s] hover:bg-[#002855] hover:text-[#F7C548] mt-8 mb-8 border-2 border-[#002855] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Check answer</button>
            {displayAnswer &&
              <div>
                <div>Answer</div>
                <div>
                  <button className='m-auto duration-[0.4s] hover:bg-[#E74C3C] hover:text-white mt-8 mb-8 border-2 border-[#E74C3C] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Wrong</button>
                  <button className='m-auto duration-[0.4s] hover:bg-[#27AE60] hover:text-white mt-8 mb-8 border-2 border-[#27AE60] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Correct</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Game