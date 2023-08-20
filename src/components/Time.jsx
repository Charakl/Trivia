import React, { useState, useEffect } from 'react';

const Time = ({ updateTime}) => {

    const seconds = ['30', '60', '90'];
    const [selectedTime, setselectedTime] = useState(seconds[0]);

    const handleTimeChange = (event) => {
        setselectedTime(event.target.value);
        console.log(selectedTime);
    };

    useEffect(() => {
        // This will be triggered after every state update
        
        console.log('Variable in child changed:', selectedTime);
        updateTime(selectedTime);
    }, [selectedTime]);
    return (
        <div>
            <h2 className='mt-5 mb-2'>How much time ?</h2>
            {seconds.map((second, index) =>(
                <label key={index} className='mr-10'>
                    <input
                        type="radio"
                        value={second}
                        checked={selectedTime === second}
                        onChange={handleTimeChange}
                        className='options-radio'
                    />
                    {second}secs
                </label>
            ))}
        </div>
    )
}

export default Time