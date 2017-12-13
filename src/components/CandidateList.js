import React from 'react';
import { connect } from 'react-redux';
import { Pager } from 'react-bootstrap';
import CandidateListItem from './CandidateListItem';
import { startPaginateNext } from '../actions/pagination';
import getVisibleCandidates from '../selectors/persons';

export class CandidateList extends React.Component {
  render() {
    const pagerInstance = (
      <Pager>
        <Pager.Item previous href="#">
          &larr; Previous Page
        </Pager.Item>
        <Pager.Item onClick={startPaginateNext} next href="#">
          Next Page &rarr;
        </Pager.Item>
      </Pager>
    );
    return (
      <div className="candidateList">
        {this.props.persons.length === 0 ? (
          <p>You have no candidates</p>
        ) : (
          this.props.persons.map(person => (
            <CandidateListItem key={person.id} {...person} />
          ))
        )}
        {pagerInstance}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  persons: getVisibleCandidates(state.persons, state.filters),
});

const mapDispatchToProps = dispatch => ({
  startPaginateNext: () => dispatch(startPaginateNext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateList);
