import logo from './logo.svg';
import './App.css';
import React, { Fragment } from 'react';
//components
import InputEntry from './components/inputEntry';
import AllEntries from './components/allEntries';
import Graph from './components/Graph';
function App() {
  return (
    <Fragment> 
      <InputEntry/>
      <Graph/>
      <AllEntries/>
    </Fragment>
  );
}

export default App;
