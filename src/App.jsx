import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <div className="mainContainer">
        <Sidebar />
        <MainContent />
      </div>
    </div>)
  };
}

export default App;
