import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Game, Result } from './components';

function App() {
  return (
    <BrowserRouter>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/result" exact element={<Result />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
