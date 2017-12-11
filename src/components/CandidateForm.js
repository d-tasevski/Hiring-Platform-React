import React, { Component } from 'react';
import moment from 'moment';
import 'react-dates/initialize'; // NOTE: React-dates not working without initializing them first
import { SingleDatePicker } from 'react-dates';
import Select from 'react-select';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';

const options = [
  { label: 'HTML5', value: 'html5' },
  { label: 'CSS3', value: 'css3' },
  { label: 'Javascript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'PHP', value: 'php' },
  { label: 'Scala', value: 'scala' },
  { label: 'React.js', value: 'react.js' },
  { label: 'Angular', value: 'angular' },
  { label: 'Java', value: 'java' },
  { label: 'Ruby', value: 'ruby' },
];

// const now = moment();
// console.log(now.format('MMM Do, Y'));

export default class CandidateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.person ? props.person.firstName : '',
      lastName: props.person ? props.person.lastName : '',
      skills: props.person ? props.person.skills : '',
      notes: props.person ? props.person.notes : '',
      date: props.person ? moment(props.person.date) : moment(),
      cvUri: props.person ? props.person.cvUri : '',
      cvFileName: props.person ? props.person.cvFileName : '',
      dateFocused: false,
      error: '',
      // React select state values
      rtl: false,
      disabled: false,
      stayOpen: false,
      removeSelected: true,
    };
  }

  onFirstNameChange = (e) => {
    const firstName = e.target.value;
    this.setState(() => ({ firstName }));
  };
  onLastNameChange = (e) => {
    const lastName = e.target.value;
    this.setState(() => ({ lastName }));
  };

  onNotesChange = (e) => {
    const notes = e.target.value;
    this.setState(() => ({ notes }));
  };

  onSkillsChange = (e) => {
    const skills = e.target.value.split(',');
    this.setState(() => ({ skills }));
  };

  onDateChange = (date) => {
    if (date) {
      this.setState(() => ({ date }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ dateFocused: focused }));
  };

  onCVUriChange = (e) => {
    // const cvFile = e.target.files[0];
    const cvFileName = `${this.state.firstName}_${this.state.lastName}.pdf`;
    const cvUri = `web-storage/cv/${cvFileName}`;
    this.setState(() => ({ cvUri, cvFileName }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.firstName || !this.state.lastName) {
      // Set error state
      const error = 'Please provide full name of the candidate.';
      this.setState((state, props) => ({ error }));
    } else {
      // Clear the error
      this.setState(() => ({ error: '' }));

      this.props.onSubmit({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        skills: this.state.skills,
        notes: this.state.notes,
        date: this.state.date.valueOf(),
        cvUri: this.state.cvUri,
        cvFileName: this.state.cvFileName,
      });
    }
  };

  handleSelectChange = (skills) => {
    console.log("You've selected:", skills);
    this.setState({ skills });
    console.log(this.props.path);
  };

  render() {
    const cvInputCheck = !(
      this.state.firstName.length > 1 && this.state.lastName.length > 1
    );
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <Form onSubmit={this.onSubmit}>
          <FormGroup controlId="formControlsFirstName">
            <ControlLabel>First name</ControlLabel>
            <FormControl
              type="text"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={this.onFirstNameChange}
              required
            />
          </FormGroup>
          <FormGroup controlId="formControlsLastName">
            <ControlLabel>Last name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={this.onLastNameChange}
              required
            />
          </FormGroup>
          <FormGroup controlId="formControlsSelectMultiple">
            <ControlLabel>Skills</ControlLabel>
            <Select
              closeOnSelect={!this.state.stayOpen}
              disabled={this.state.disabled}
              multi
              onChange={this.handleSelectChange}
              options={options}
              placeholder="Select candidate's skills"
              removeSelected={this.state.removeSelected}
              rtl={this.state.rtl}
              simpleValue
              value={this.state.skills}
            />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Notes about candidate</ControlLabel>
            <FormControl
              componentClass="textarea"
              name="notes"
              rows={5}
              value={this.state.notes}
              onChange={this.onNotesChange}
              placeholder="Notes"
            />
          </FormGroup>
          <div>
            <FormGroup>
              <FormControl
                disabled={cvInputCheck}
                type="file"
                name="cvFile"
                id="cvFile"
                onChange={this.onCVUriChange}
                accept=".pdf, .doc, .docx"
              />
            </FormGroup>
            <SingleDatePicker
              withPortal
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={this.onDateChange} // PropTypes.func.isRequired
              focused={this.state.dateFocused} // PropTypes.bool
              onFocusChange={this.onFocusChange} // PropTypes.func.isRequired
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          <Button type="submit" block>
            {this.props.path === '/create' ? 'Add Candidate' : 'Finish Editing'}
          </Button>
        </Form>
      </div>
    );
  }
}

/**

/^\d*(\.\d{0,2})?$/

^ asserts position at start of the string
\d* matches a digit (equal to [0-9])
* Quantifier — Matches between zero and unlimited times, as many times as possible, giving back as needed (greedy)
1st Capturing Group (\.\d{0,2})?
? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
\. matches the character . literally (case sensitive)
\d{0,2} matches a digit (equal to [0-9])
{0,2} Quantifier — Matches between 0 and 2 times, as many times as possible, giving back as needed (greedy)
$ asserts position at the end of the string, or before the line terminator right at the end of the string (if any)

 */
