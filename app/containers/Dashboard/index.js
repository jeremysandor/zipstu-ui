/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Calendar from '../Calendar';
import Profile from '../Profile';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

export class Dashboard extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    console.log('Dashboard props: ', this.props);
    const { match } = this.props;
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Link to={`${match.url}/profile`}>
          <Button>Profile</Button>
        </Link>
        <Link to={`${match.url}/calendar`}>
          <Button>Calendar</Button>
        </Link>
        <Link to={`${match.url}/billing`}>
          <Button>Billing</Button>
        </Link>        
        <Link to={`${match.url}/messages`}>
          <Button>Messages</Button>
        </Link>                     

        <Switch>
          <Route path={`${match.url}/profile`} component={Profile} />
          <Route path={`${match.url}/calendar`} component={Calendar} />
        </Switch>
      
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
