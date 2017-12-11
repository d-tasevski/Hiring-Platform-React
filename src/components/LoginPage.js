import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

/* eslint-disable no-shadow */
export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h2 className="box-layout__title">InterVenture dashboard</h2>
      <p>Get your candidates under control!</p>
      <Button bsStyle="primary" bsSize="large" onClick={startLogin}>
        Login
      </Button>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  startLogin: () => dispatch(startLogin()),
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
