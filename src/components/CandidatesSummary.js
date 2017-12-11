import React from 'react';
import { connect } from 'react-redux';
import getVisibleCandidates from '../selectors/persons';
import selectCandidatesTotal from '../selectors/candidatesTotal';

export const CandidatesSummary = ({ candidatesCount, candidatesTotal }) => {
  const candidatesWording = candidatesCount === 1 ? 'candidate' : 'candidates';

  return (
    <div>
      <h3>
        {candidatesCount} {candidatesWording}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleCandidates = getVisibleCandidates(state.persons, state.filters);
  return {
    candidatesCount: visibleCandidates.length,
    candidatesTotal: selectCandidatesTotal(visibleCandidates),
  };
};

export default connect(mapStateToProps)(CandidatesSummary);
