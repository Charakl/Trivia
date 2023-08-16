import React, { useEffect, useState } from 'react'

const Countdown = () => {
    const [countdown, setCountdown] = useState(15);
    const [isPaused, setIsPaused] = useState(false);
    const [smallerThanTen, setSmallerThanTen] = useState(false);

    useEffect(() => {
        let timer;
        if (!isPaused) {
          timer = setInterval(() => {
            if (countdown > 0) {
              setCountdown((prevCountdown) => prevCountdown - 1);
              if(countdown <= 10) {
                setSmallerThanTen(true);
              }
            } else {
              clearInterval(timer);
              // Countdown has reached zero, you can trigger any desired action here
            }
          }, 1000); // Update every second
        }
    
        return () => {
          clearInterval(timer);
        };
    }, [countdown, isPaused]);
    
    const handlePauseResume = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
    };
    
    // Format the remaining time as "mm:ss"
    const formattedTime = `${Math.floor(countdown / 60)
    .toString()
    .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`;

    return (
        <div className='flex flex-wrap'>
            <p className={`text-[25px] ${smallerThanTen && 'text-[#E74C3C]'}`}>Time remaining: {formattedTime}</p>
            <button onClick={handlePauseResume} className='duration-[0.4s] hover:bg-[#27AE60] hover:text-white border-2 border-[#27AE60] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>
                {isPaused ? 'Resume' : 'Pause'}
            </button>
        </div>
    )
}

export default Countdown