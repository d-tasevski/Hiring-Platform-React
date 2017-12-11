import React from 'react';
import { connect } from 'react-redux';
import CandidateListItem from './CandidateListItem';
import getVisibleCandidates from '../selectors/persons';

export const CandidateList = props => (
  <div className="candidateList">
    {props.persons.length === 0 ? (
      <p>You have no candidates</p>
    ) : (
      props.persons.map(person => (
        <CandidateListItem key={person.id} {...person} />
      ))
    )}
  </div>
);

const mapStateToProps = state => ({
  persons: getVisibleCandidates(state.persons, state.filters),
});

export default connect(mapStateToProps)(CandidateList);
