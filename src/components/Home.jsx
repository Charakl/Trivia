import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import Time from './Time';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const teams = ['2', '3', '4','5'];

  /* retrieves an array of colors that have been already picked by 
  other teams, excluding the color of the current team represented 
  by the given index*/ 
 

  const getUsedColors = (index) => {
    // console.log('teamData has been updated:', teamData, teamData.length);
    // console.log(index);
    // const la = teamData.filter((team, i) => i !== index).map((team) => team.color);
    // console.log(la);
    // return teamData
    //   .filter((team, i) => i !== index) // Exclude the current team from the filter
    //   .map((team) => team.color);
    const updatedTeamData = teamData.filter((team, i) => i !== index);
  return updatedTeamData.map((team) => team.color);
  };
  const [selectedTeam, setselectedTeam] = useState(teams[0]);

  const rounds = ['5', '10', '15', '20', '25', '30'];
  const [selectedRounds, setselectedRounds] = useState(rounds[1]);
  const [finalCategories, setFinalCategories] = useState([]);

  const colors = ['blue', 'red', 'green', 'orange', 'yellow', 'purple', 'pink'];


  const [teamData, setTeamData] = useState([{ name: '', color: '' },
  { name: '', color: '' }]);

  const [time, setTime] = useState('');

  const updateTime = (finalTime) => {
    setTime(finalTime);
  };

  const [categs, setCategs] = useState([]);

  const updateCategs = (finalCategs) => {
    setCategs(finalCategs);
  };

  useEffect(() => {
    // This will be triggered after every state update
    
  }, [teamData]);

  useEffect(() => {
    // This will be triggered after every state update
    const temp = categs.filter(item => item.checked === true);
    setFinalCategories(temp);
    console.log(temp);
    console.log('Variable in parent changed:', categs);
  }, [categs]);

  const handleTeamChange = (event) => {
    const num = event.target.value;
    console.log(num);
    setselectedTeam(num);
    
    // console.log(selectedTeam);
    // setTeamData(Array(parseInt(selectedTeam)).fill({ name: '', color: '' }));
    // console.log(teamData);
    setTeamData((prevTeamData) => {
      // If the number of teams is increased, add empty team objects for the new teams

      if (num > prevTeamData.length) {
        console.log(prevTeamData);
        console.log(num - prevTeamData.length);
        const emptyTeamsToAdd = Array(num - prevTeamData.length).fill({ name: '', color: '' });
        console.log(emptyTeamsToAdd);
        return [...prevTeamData, ...emptyTeamsToAdd];
      }
      
      // If the number of teams is decreased, remove team objects from the end
      return prevTeamData.slice(0, num);
    });
    console.log(teamData);
    console.log(teamData.length);
    
  };



  const handleRoundsChange = (event) => {
    setselectedRounds(event.target.value);
    console.log(selectedRounds);
  };

  const handleNameChange = (event, index) => {
    const newTeamData = [...teamData];
    newTeamData[index].name = event.target.value;
    setTeamData(newTeamData);
    console.log(teamData);
  };

  const handleColorChange = (event, index) => {
    const newColor = event.target.value;
    setTeamData((prevTeamData) => {
      return prevTeamData.map((team, i) => {
        if (i === index) {
          return { ...team, color: newColor };
        }
        return team;
      });
    });

    // const newTeamData = [...teamData];
    // newTeamData[index].color = event.target.value;
    // setTeamData(newTeamData);
    // console.log(teamData);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(teamData);

    localStorage.setItem('names-colors', JSON.stringify(teamData));
    localStorage.setItem('teams', selectedTeam);
    localStorage.setItem('rounds', selectedRounds);
    localStorage.setItem('time', time);
    localStorage.setItem('categories', JSON.stringify(finalCategories));
    navigate('/game');
  }

  return (
    <div>
      <h1 className='text-[30px] text-center mt-10'>Welcome to trivia!</h1>
      <div className='m-auto with-radial-gradient w-[800px]'>
      <h2 className='text-center mt-10 mb-10 text-[#002855] text-[30px]'>Game Settings</h2>
      <form onSubmit={handleSubmit} className='pl-10 pr-10'>
      
      <h3 className='mb-2'>How many teams ?</h3>
      {teams.map((team) => (
        <label key={team} className='mr-10'>
          <input
            type="radio"
            value={team}
            checked={selectedTeam === team}
            onChange={handleTeamChange}
            className='options-radio'
          />
          {team} Teams
        </label>
      ))}
      <div className='flex justify-start '>
      <section className='flex align-center'>
      <div>
      <h3 className='mt-6 mb-2'>Name the teams</h3>
      {/* <div>
        {[...Array(parseInt(selectedTeam))].map((_, index) => (
          <input key={index} type="text" placeholder={`Team ${index + 1}`} />
        ))}
      </div> */}
      
      <div className='flex flex-col'>
        {teamData.map((team, index) => (
          <input 
            key={index} 
            type="text" 
            value={team.name} 
            onChange={(e) => handleNameChange(e, index)} 
            className='border border-2 border-black p-1 pl-2 mb-1 rounded-xl'
          />
        ))}
        
        
      </div>
      </div>
      <div>
      <h3 className='mt-6 mb-2 ml-4'>Choose color for each team</h3>
      <div className='ml-2'>
        {teamData.map((team, index) => (
          <div key={index}>
            {colors.map((color) => (
              <input
                key={color}
                type="radio"
                style={{ backgroundColor: color || "#FFFFFF" }}
                className={`form-radio mb-[3px] ml-2 disabled:opacity-30 disabled:cursor-default cursor-pointer transition duration-150 ease-in-out`}
                value={color}
                checked={team.color === color}
                onChange={(e) => handleColorChange(e, index)}
                disabled={getUsedColors(index).includes(color)}
              />
            ))}
          </div>
        ))}
      </div>
      </div>
      </section>
      </div>
     
      <h3 className='mt-5 mb-2'>How many rounds ?</h3>
      <div className='flex flex-wrap'>
        {rounds.map((round, index) => (
          <label key={index} className='mr-5'>
            <input
              type="radio"
              value={round}
              checked={selectedRounds === round}
              onChange={handleRoundsChange}
              className='options-radio'
            />
            {round} Rounds
          </label>
        ))}
      </div>
      <Time updateTime={updateTime} />
      <Categories updateCategs={updateCategs} />


      <div className='flex'>
      <button className='m-auto duration-[0.4s] hover:bg-[#002855] hover:text-[#F7C548] mt-8 mb-8 border-2 border-[#002855] text-[#002855] p-2 pl-4 pr-4 rounded-xl'>Submit</button>
      </div>
      
      </form>
      </div>
    </div>
  )
}

export default Home