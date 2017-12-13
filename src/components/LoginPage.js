import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

/* eslint-disable no-shadow */
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h2 className="box-layout__title">InterVenture</h2>
      <p className="box-layout__subtitle">Applicant tracking dashboard</p>
      <Button className="button" bsSize="large" onClick={startLogin}>
        Login with Google
      </Button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
