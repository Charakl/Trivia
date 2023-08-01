import React, { useState } from 'react';

const Home = () => {
  // const [teams, setTeams] = useState(1);

  // const howManyTeams = (value) => {
  //   if(value > 10){
  //     setTeams(10);
  //   }else if(value < 1){
  //     setTeams(1);
  //   }else{
  //     setTeams(value);
  //   }
  // }
  // const teams = ['2 Teams', '3 Teams', '4 Teams', '5 Teams'];
  const teams = ['2', '3', '4','5'];
  // const teams = [
  //   { label: '2 Teams', value: 2 },
  //   { label: '3 Teams', value: 3 },
  //   { label: '4 Teams', value: 4 },
  //   { label: '5 Teams', value: 5 },
  // ];
  const [selectedTeam, setselectedTeam] = useState(teams[0]);

  const rounds = ['5', '10', '15', '20', '25', '30'];
  const [selectedRounds, setselectedRounds] = useState(rounds[1]);

  const colors = ['blue', 'red', 'green', 'orange', 'yellow', 'purple', 'pink'];
  const [selectedColor, setselectedColor] = useState(colors[0]);

  const handleTeamChange = (event) => {
    setselectedTeam(event.target.value);
    console.log(selectedTeam);
  };

  const handleRoundsChange = (event) => {
    setselectedRounds(event.target.value);
    console.log(selectedRounds);
    console.log(selectedTeam);
  };

  const handleColorChange = (event) => {
    setselectedColor(event.target.value);
    console.log(selectedColor);
  };

  return (
    <div>
      <h1 className='text-[30px] text-center mt-10'>Welcome to trivia!</h1>
      <h2>Game Settings:</h2>
      <h3>How many teams ?</h3>
      {teams.map((team, index) => (
        <label key={index}>
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
      <div>
        {[...Array(parseInt(selectedTeam))].map((_, index) => (
          <input key={index} type="text" placeholder={`Team ${index + 1}`} />
        ))}
      </div>

      <h3>Choose color</h3>
      {colors.map((color, index) => (
        <label key={index}>
          <input
            type="checkbox"
            style={{ backgroundColor: color || "#FFFFFF" }}
            className={`form-radio transition duration-150 ease-in-out`}
            value={color}
            checked={selectedColor === color}
            onChange={handleColorChange}
          />
          {color} color
        </label>
      ))}


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
    </div>
  )
}

export default Home