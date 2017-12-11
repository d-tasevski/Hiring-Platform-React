import 'react-dates/initialize';
import React, { Component } from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate,
} from '../actions/filters';

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
    } else if (e.target.value === 'amount') {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div className="filterForm">
        <Form inline>
          <FormGroup controlId="formInlineName">
            <FormControl
              className="textFilter"
              type="text"
              name="filter"
              value={this.props.filters.text}
              onChange={this.onTextChange}
              placeholder="Search by Name"
            />
            <select
              className="form-control sortFilter"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
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
  sortByAmount: () => {
    dispatch(sortByAmount());
  },
  setStartDate: (startDate) => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: (endDate) => {
    dispatch(setEndDate(endDate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CandidateListFilters, );
