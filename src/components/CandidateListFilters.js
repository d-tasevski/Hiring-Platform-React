import 'react-dates/initialize';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { startLoadSamples } from '../actions/persons';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import {
  setTextFilter,
  sortByDate,
  sortByName,
  setStartDate,
  setEndDate,
} from '../actions/filters';
import persons from '../fixtures/persons';

export class CandidateListFilters extends Component {
  constructor(props) {
    super();
    this.state = {
      focusedInput: null,
    };
  }
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (focusedInput) => {
    this.setState(() => ({ focusedInput }));
  };

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  onSortChange = (e) => {
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'name') {
      this.props.sortByName();
    }
  };

  handleSampleData = () => {
    persons.forEach((person) => {
      this.props.startLoadSamples(person);
    });
  };

  render() {
    return (
      <div className="filterForm">
        <Form inline>
          <FormGroup controlId="formInlineName">
            <label>Sort by:&nbsp;</label>
            <select
              className="form-control sortFilter"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
            <FormControl
              className="textFilter"
              type="text"
              name="filter"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              placeholder="Search by Name"
            />
            <DateRangePicker
              withPortal
              showDefaultInputIcon
              daySize={60}
              startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
              endDate={this.props.filters.endDate} // momentPropTypes.momentObj or null,
              startDateId="datepicker_start_home"
              endDateId="datepicker_end_home"
              onDatesChange={this.onDatesChange} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
              isOutsideRange={() => false}
              numberOfMonths={1}
            />
          </FormGroup>
        </Form>
        <button
          className="custom-btn buttonLabel"
          onClick={this.handleSampleData}
        >
          Load sample data
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: (text) => {
    dispatch(setTextFilter(text));
  },
  sortByDate: () => {
    dispatch(sortByDate());
  },
  sortByName: () => {
    dispatch(sortByName());
  },
  setStartDate: (startDate) => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: (endDate) => {
    dispatch(setEndDate(endDate));
  },
  startLoadSamples: data => dispatch(startLoadSamples(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateListFilters, );
