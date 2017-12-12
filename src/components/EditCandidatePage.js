import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import CandidateForm from './CandidateForm';
import { startEditCandidate, startRemoveCandidate } from '../actions/persons';

export class EditCandidatePage extends React.Component {
  onSubmit = (person) => {
    // dispatch the action to edit the person
    this.props.startEditCandidate(this.props.person.id, person);
    // Redirect to home page
    this.props.history.push('/');
    console.info('updated', person);
  };

  onRemove = () => {
    this.props.startRemoveCandidate({ id: this.props.person.id });
    this.props.history.push('/');
  };

  render() {
    return (
      <div className="container">
        <h2 className="textCenter">
          Editing {this.props.person.firstName} {this.props.person.lastName}&apos;s
          profile
        </h2>
        <CandidateForm person={this.props.person} onSubmit={this.onSubmit} />
        <div className="removeBtn">
          <Button
            className="buttonDanger"
            bsStyle="danger"
            bsSize="small"
            onClick={this.onRemove}
          >
            Remove Candidate
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  person: state.persons.find(person => person.id === props.match.params.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditCandidate: (id, person) => dispatch(startEditCandidate(id, person)),
  startRemoveCandidate: data => dispatch(startRemoveCandidate(data)),
});

/* NOTE: In the first pair of the parenthesis we re getting state info,
    but if operation doesn't need to know anything about state, we can leave it blank.
*/
export default connect(mapStateToProps, mapDispatchToProps)(EditCandidatePage);
