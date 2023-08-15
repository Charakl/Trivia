import React, { useState, useEffect } from 'react';

const Time = ({ updateTime}) => {

    const minutes = ['1', '2', '3'];
    const [selectedTime, setselectedTime] = useState(minutes[0]);

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
            {minutes.map((minute, index) =>(
                <label key={index} className='mr-10'>
                    <input
                        type="radio"
                        value={minute}
                        checked={selectedTime === minute}
                        onChange={handleTimeChange}
                        className='options-radio'
                    />
                    {minute}{minute === '1' ? 'min' : 'mins'}
                </label>
            ))}
        </div>
    )
}

export default Time