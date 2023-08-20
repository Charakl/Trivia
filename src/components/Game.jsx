import React, { useEffect, useState } from 'react'
import Countdown from './Countdown';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Game = () => {

  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [displayStartButton, setDisplayStartButton] = useState(true);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [categories, setCategories] = useState([]);
  const [randomCategory, setRandomCategory] = useState('');
  const [name_colors, setName_colors] = useState([]);
  const [teams, setTeams] = useState('');
  const [time, setTime] = useState('');
  const [rounds, setRounds] = useState('');
  const [turnIndex, setTurnIndex] = useState(0);
  const [teamIndex, setTeamIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(name_colors);
  }, [name_colors])

  const fetchTriviaData = () => {
    const category = randomCategory;
    const apiKey = 'key';
    const apiUrl = `https://api.api-ninjas.com/v1/trivia?category=${category}`;

    if(randomCategory !== '') {
      axios.get(apiUrl, {
        headers: {
            'X-Api-Key': apiKey
        }
      })
      .then((response) => {
          console.log(response.data);
          setQuestion(response.data[0].question);
          setAnswer(response.data[0].answer);
          console.log(response.data[0].category);
      })
      .catch((error) => {
          console.error('Error: ', error.response.data);
      });
    }
  }

  // using useEffect to only make the request once
  useEffect(() => {
    fetchTriviaData();
  }, [randomCategory])
  
  useEffect(() => {
    // pick a random category
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedCategories) {
      console.log(storedCategories);
      const randomIndex = Math.floor(Math.random() * storedCategories.length);
      const randomOption = storedCategories[randomIndex];
      setCategories(storedCategories);
      setRandomCategory(randomOption.key);
    }

    if (localStorage.getItem('names-colors')) {
      setName_colors(JSON.parse(localStorage.getItem('names-colors')));
      console.log(name_colors);
    }

    if (localStorage.getItem('teams')) {
      setTeams(localStorage.getItem('teams'));
    }

    if (localStorage.getItem('time')) {
      setTime(localStorage.getItem('time'));
    }

    if (localStorage.getItem('rounds')) {
      setRounds(parseInt(localStorage.getItem('rounds')));
    }

  }, []);
  
  const display = () => {
    setDisplayQuestion(true);
    setDisplayStartButton(false);
  }

  const nextTurn = () => {
    console.log(teamIndex);
    console.log(turnIndex);
      console.log(teams);
      console.log(rounds - 1);
    if(turnIndex < rounds * teams - 1){
      
      if(teamIndex < teams - 1) {
        setTeamIndex(prevIndex => prevIndex + 1)
      }else {
        setTeamIndex(0);
      }
      setTurnIndex(prevIndex => prevIndex + 1);
      fetchTriviaData();
      setDisplayQuestion(false)
      setDisplayStartButton(true);
      setDisplayAnswer(false);
    }else {
      navigate('/result');
    }
  }

  const correct = () => {
    // add 1 point 
    console.log(name_colors);
    const addPoint = [ ...name_colors ];
    addPoint[teamIndex].points += 1; 
    localStorage.setItem('names-colors', JSON.stringify(addPoint));
    nextTurn();
  }

  return (
    <div>
      {name_colors.length > 0 && (
        // i can't use dynamic values in tailwind so i used style
      <div style={{borderColor:`${name_colors[teamIndex].color}`}} className={`m-auto border-4 w-[800px] flex flex-col items-center`}>
      
        <h2 className='text-[30px]'>Team 1 {name_colors[teamIndex].name} {name_colors[teamIndex].color}</h2>
      
        {displayStartButton &&
          <button onClick={display} className='m-auto duration-[0.4s] hover:bg-[#002855] hover:text-[#F7C548] mt-8 mb-8 border-2 border-[#002855] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Start</button>
        }
        {displayQuestion &&
          <div>
            <Countdown time={time} />
            <div>{question}</div>
            <button onClick={() => setDisplayAnswer(true)} className='m-auto duration-[0.4s] hover:bg-[#002855] hover:text-[#F7C548] mt-8 mb-8 border-2 border-[#002855] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Check answer</button>
            {displayAnswer &&
              <div>
                <div>{answer}</div>
                <div>
                  <button onClick={nextTurn} className='m-auto duration-[0.4s] hover:bg-[#E74C3C] hover:text-white mt-8 mb-8 border-2 border-[#E74C3C] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Wrong</button>
                  <button onClick={correct} className='m-auto duration-[0.4s] hover:bg-[#27AE60] hover:text-white mt-8 mb-8 border-2 border-[#27AE60] text-[#002855] p-2 pl-6 pr-6 rounded-xl'>Correct</button>
                </div>
              </div>
            }
          </div>
        }
      </div>
      )}
    </div>
    
  )
}

export default Game