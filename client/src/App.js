import React from 'react';
import './styles/App.css';
import { NavLink, Route } from 'react-router-dom';
import SimpleLevelEncode from './components/SimpleLevel/SimpleLevelEncode';
import HardLevelEncode from './components/HardLevel/HardLevelEncode';
import MediumLevelEncode from './components/MediumLevel/MediumLevelEncode';
import SimpleLevelDecode from './components/SimpleLevel/SimpleLevelDecode';
import MediumLevelDecode from './components/MediumLevel/MediumLevelDecode';


function App() {
  return (
    <div className="container">
      <aside className="navigation">
        <ul className="navigation__menu">
          <li>
            <NavLink to="/encode/simple">Simple Level Encode</NavLink>
          </li>
          <li>
            <NavLink to="/decode/simple">Simple Level Decode</NavLink>
          </li>
          <li>
            <NavLink to="/encode/medium">Medium Level Encode</NavLink>
          </li>
          <li>
            <NavLink to="/decode/medium">Medium Level Decode</NavLink>
          </li>
          <li>
            <NavLink to="/encode/hard">Hard Level Encode</NavLink>
          </li>
        </ul>
      </aside>
      <main>
        <Route path='/encode/simple' render={() => <SimpleLevelEncode />} />
        <Route path='/decode/simple' render={() => <SimpleLevelDecode />} />
        <Route path='/encode/medium' render={() => <MediumLevelEncode />} />
        <Route path='/decode/medium' render={() => <MediumLevelDecode />} />
        <Route path='/encode/hard' render={() => <HardLevelEncode />} />
      </main>
    </div>
  );
}

export default App;
