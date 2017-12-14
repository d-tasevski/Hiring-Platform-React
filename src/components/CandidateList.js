import React from 'react';
import { connect } from 'react-redux';
import { Pager } from 'react-bootstrap';
import CandidateListItem from './CandidateListItem';
import { startPaginateNext } from '../actions/pagination';
import getVisibleCandidates from '../selectors/persons';

export class CandidateList extends React.Component {
  render() {
    // const perPage = 6;
    // const pages = Math.ceil(this.props.persons.length / perPage);
    // const currentPage = this.props.page;
    // const startOffset = (currentPage - 1) * perPage;
    // const startCount = 0;

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
      <div>
        <div className="candidateList">
          {this.props.persons.length === 0 ? (
            <p>You have no candidates</p>
          ) : (
            this.props.persons.map(person => (
              <CandidateListItem key={person.id} {...person} />
            ))
          )}
        </div>
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
