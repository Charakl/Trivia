import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
  

const Categories = ({ updateCategs }) => {

    const [categories, setCategories] = useState([
        {key:'artliterature', name: 'Art/Literature', checked: false},
        {key:'language', name: 'Language', checked: false},
        {key:'sciencenature', name: 'Science/Nature', checked: false},
        {key:'general', name: 'General', checked: false},
        {key:'fooddrink', name: 'Food/Drink', checked: false},
        {key:'peopleplaces', name: 'People/Places', checked: false},
        {key:'geography', name: 'Geography', checked: false},
        {key:'historyholidays', name: 'History/Holidays', checked: false},
        {key:'entertainment', name: 'Entertainment', checked: false},
        {key:'toysgames', name: 'Toys/Games', checked: false},
        {key:'music', name: 'Music', checked: false},
        {key:'mathematics', name: 'Mathematics', checked: false},
        {key:'religionmythology', name: 'Religion/Mythology', checked: false},
        {key:'sportsleisure', name: 'Sports/Leisure', checked: false},
    ]);

    const handleCategoryChange = (index) => {
        // const { name, checked } = event.target;
        console.log(index);
        setCategories((prevCategories) => {
            const updatedCategories = [...prevCategories];
            updatedCategories[index] = {
                ...updatedCategories[index],
                checked: !updatedCategories[index].checked,
            };
            // console.log(updatedCategories[index].checked);
            // updatedCategories[index].checked = !updatedCategories[index].checked;
            return updatedCategories;
        });
    };

    useEffect(() => {
        // This will be triggered after every state update
        
        console.log('Variable in child changed:', categories);
        updateCategs(categories);
      }, [categories]);
    

    return (
        <div>
            <h2 className='mt-5 mb-2'>Choose Categories</h2>
            <div>
                {/* <div> */}
                {categories.map((category, index) => (
                    <label 
                        key={index}
                        className={`ml-2 mb-2 ${category.checked ? 'border-[#333652] bg-[#90ADC6]': 'border-[#F7C548]'} checked-label cursor-pointer inline-flex relative border-2 rounded-xl p-2`}
                    >
                        <input
                            type="checkbox"
                            name={category.key}
                            // className='custom-checkbox w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                            checked={categories.checked}
                            onChange={() => handleCategoryChange(index)}
                            className='custom-checkbox mr-1 checked:border-black appearance-none h-6 w-6 border-2 rounded-md border-[#F7C548]'
                        />
                        <FontAwesomeIcon icon={faCheck} className='check-start text-opacity-0 absolute left-[10px] bottom-[10px] h-6 w-6 text-red-500 transition' />
                        {category.name}
                    </label>
                ))}
                {/* </div> */}
                
                
            </div>
        </div>
    )
}

export default Categories