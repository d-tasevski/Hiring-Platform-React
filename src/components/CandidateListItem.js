import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Panel, Glyphicon } from 'react-bootstrap';
import { formatDate } from '../helpers'; // or just use Numeral.js for formating currency

class CandidateListItem extends React.Component {
  constructor(props) {
    super();

    this.state = {
      open: false,
    };
  }
  render() {
    const {
      firstName,
      lastName,
      skills,
      notes,
      date,
      cvUri,
      cvFileName,
      id,
    } = this.props;
    return (
      <div className="container candidateCard">
        <Link to={`/edit/${id}`}>
          <h3 title="Edit applicant's profile">
            <Glyphicon glyph="user" /> {`${firstName} ${lastName}`}
          </h3>
        </Link>
        <p className="candidateCard__appliedDate">
          Applied {formatDate(date)}{' '}
        </p>
        {skills && (
          <div>
            <p className="candidateCard__skilled">Skilled in: </p>
            <p>
              {skills.split(',').map(skill => (
                <button className="custom-btn buttonLabel" key={skill}>
                  {skill}
                </button>
              ))}
            </p>
          </div>
        )}
        <div>
          <Button
            className="buttonInfo"
            onClick={() => this.setState({ open: !this.state.open })}
          >
            More info
          </Button>
          <Panel collapsible expanded={this.state.open}>
            {notes && (
              <div className="candidateCard__notes">
                <p className="textCenter">Notes about candidate: </p>
                <p className="well well-sm">{notes}</p>
                <hr />
              </div>
            )}
            {cvUri &&
              cvFileName && (
                <p className="candidateCard__cv">
                  <a href={cvUri} className="buttonDl">
                    <span className="away">Download CV</span>
                    <span className="over">{cvFileName}</span>
                  </a>
                </p>
              )}
          </Panel>
        </div>
      </div>
    );
  }
}

export default CandidateListItem;
