import React, { useState } from 'react';

const Home = () => {
  const teams = ['2', '3', '4','5'];

  /* retrieves an array of colors that have been already picked by 
  other teams, excluding the color of the current team represented 
  by the given index*/ 
  const getUsedColors = (index) => {
    return teamData
      .filter((team, i) => i !== index) // Exclude the current team from the filter
      .map((team) => team.color);
  };
  const [selectedTeam, setselectedTeam] = useState(teams[0]);

  const rounds = ['5', '10', '15', '20', '25', '30'];
  const [selectedRounds, setselectedRounds] = useState(rounds[1]);

  const colors = ['blue', 'red', 'green', 'orange', 'yellow', 'purple', 'pink'];


  const [teamData, setTeamData] = useState([{ name: '', color: '' },
  { name: '', color: '' }]);

  const handleTeamChange = (event) => {
    const num = event.target.value;
    setselectedTeam(num);
    // console.log(selectedTeam);
    // setTeamData(Array(parseInt(selectedTeam)).fill({ name: '', color: '' }));
    // console.log(teamData);
    setTeamData((prevTeamData) => {
      // If the number of teams is increased, add empty team objects for the new teams
      if (num > prevTeamData.length) {
        const emptyTeamsToAdd = Array(num - prevTeamData.length).fill({ name: '', color: '' });
        return [...prevTeamData, ...emptyTeamsToAdd];
      }
      // If the number of teams is decreased, remove team objects from the end
      return prevTeamData.slice(0, num);
    });
    
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
    const newTeamData = [...teamData];
    newTeamData[index].color = event.target.value;
    setTeamData(newTeamData);
    console.log(teamData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(teamData);
  }

  return (
    <div>
      <h1 className='text-[30px] text-center mt-10'>Welcome to trivia!</h1>
      <h2>Game Settings:</h2>
      <form onSubmit={handleSubmit}>
      
      <h3>How many teams ?</h3>
      {teams.map((team) => (
        <label key={team}>
          <input
            type="radio"
            value={team}
            checked={selectedTeam === team}
            onChange={handleTeamChange}
          />
          {team} Teams
        </label>
      ))}
      
      <h3>Name the teams</h3>
      {/* <div>
        {[...Array(parseInt(selectedTeam))].map((_, index) => (
          <input key={index} type="text" placeholder={`Team ${index + 1}`} />
        ))}
      </div> */}
      <div>
        {teamData.map((team, index) => (
          <input key={index} type="text" value={team.name} onChange={(e) => handleNameChange(e, index)} />
        ))}
      </div>
      <h3>Choose color</h3>
      <div>
        {teamData.map((team, index) => (
          <div key={index}>
            {colors.map((color) => (
              <input
                key={color}
                type="radio"
                style={{ backgroundColor: color || "#FFFFFF" }}
                className={`form-radio disabled:opacity-30 disabled:cursor-default cursor-pointer transition duration-150 ease-in-out`}
                value={color}
                checked={team.color === color}
                onChange={(e) => handleColorChange(e, index)}
                disabled={getUsedColors(index).includes(color)}
              />
            ))}
          </div>
        ))}
      </div>
     
      <h3>How many rounds ?</h3>
      {rounds.map((round, index) => (
        <label key={index}>
          <input
            type="radio"
            value={round}
            checked={selectedRounds === round}
            onChange={handleRoundsChange}
          />
          {round} Rounds
        </label>
      ))}

      <button>Submit</button>
      </form>
    </div>
  )
}

export default Home