import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
//components
import InputEntry from './components/inputEntry';
import AllEntries from './components/allEntries';
import Login from './components/Login';
function App() {
  return (
    <Fragment>
      <h1 className="text-center">
        Crypto Portfolio Tracker
      </h1>
      <Login>
        <InputEntry />
        <AllEntries />
      </Login>
    </Fragment>
  );
}

export default App;
