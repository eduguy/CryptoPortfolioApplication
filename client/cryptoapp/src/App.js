import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
//components
import InputEntry from './components/inputEntry';
import AllEntries from './components/allEntries';
function App() {
  return (
    <Fragment> 
      <InputEntry/>
      <AllEntries/>
    </Fragment>
  );
}

export default App;
