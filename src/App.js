/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-select/dist/react-select.css';
import './App.css';
import CandidateList from './components/CandidateList';
import CandidateListFilters from './components/CandidateListFilters';
// import CandidatesSummary from './components/CandidatesSummary';

class App extends Component {
  render() {
    return (
      <div className="container">
        <CandidateListFilters />
        <CandidateList />
      </div>
    );
  }
}

export default App;
