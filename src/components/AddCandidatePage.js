import React from 'react';
import { connect } from 'react-redux';
import { startAddCandidate } from '../actions/persons';
import CandidateForm from './CandidateForm';

export class AddCandidatePage extends React.Component {
  onSubmit = (person) => {
    this.props.startAddCandidate(person);
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="container">
        <h2 className="textCenter">Add candidate info</h2>
        <CandidateForm onSubmit={this.onSubmit} path={this.props.match.path} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddCandidate: person => dispatch(startAddCandidate(person)),
});

export default connect(undefined, mapDispatchToProps)(AddCandidatePage);
