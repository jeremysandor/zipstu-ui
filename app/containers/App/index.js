/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import LandingPage from 'containers/LandingPage/Loadable';
import Dashboard from 'containers/Dashboard/Loadable';
import Discover from 'containers/Discover/Loadable';
import MainPage from 'containers/MainPage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import VenuePage from 'containers/VenuePage/Loadable';
import TablePage from 'containers/TablePage/Loadable';
import Signup from 'containers/Signup/Loadable';
import Signin from 'containers/Signin/Loadable';
import Provider from 'containers/EditProvider/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import ForgotPasswordSubmit from 'containers/ForgotPasswordSubmit/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { sessionSelector, authedSelector, makeSelectLoading } from './selectors';
import {loadSession} from './actions';

import reducer from './reducer';
import saga from './saga';

// import { Link } from 'react-router-dom';

// material ui
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { List, ListItem, ListItemIcon, ListItemText } from 'material-ui';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';

import Grid from 'material-ui/Grid';

// to-do move to a component 
import SupervisorAccount from 'material-ui-icons/SupervisorAccount';
import Home from 'material-ui-icons/Home';
import ViewList from 'material-ui-icons/ViewList';

// Authentication
import Amplify from 'aws-amplify';
Amplify.configure({
  Auth: {
    identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
    region: process.env.AWS_REGION,
    userPoolId: process.env.AWS_USER_POOL_ID,
    userPoolWebClientId: process.env.AWS_USER_POOL_WEB_CLIENT_ID,
    mandatorySignIn: false,
    cookieStorage: {
      domain: '.zipstu-dev.com',
      path: '/',
      expires: 365,
      secure: false
    }
  }
});
import { withAuthenticator } from 'aws-amplify-react'; 


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: '100%',
    // zIndex: 1,
    // overflow: 'hidden',
    // position: 'relative',
    // display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    color: 'black'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  flex: {
    flex: 1,
  }
});


function PrivateRoute ({component: Component, authed: authed, ...rest}) {
  console.log('privateRoute', authed)
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
    />
  )
}  

export class App extends React.PureComponent {
  
  componentDidMount() {
    // load session auth info
    this.props.onLoadSession();
  }

  render() {
    const { loading, authed } = this.props;
    console.log('loading', loading)
    console.log('authed', authed)
    if (loading) return <div>loading...</div>; // Or whatever you want to return when it is loading
    // if (!loading || !data) return null; // If it is not loading and its not loaded, then return nothing.    
    return (
      <div>
        <main className={this.props.classes.content}>
          <div className={this.props.classes.toolbar} />
          <Switch>
           <PrivateRoute path="/provider" component={Provider} authed={this.props.authed} />
           <PrivateRoute path="/dashboard" component={Dashboard} authed={this.props.authed} />

           <Route exact path="/" component={LandingPage} />
           <Route path="/features" component={FeaturePage} />
           <Route path="/venues" component={VenuePage} />
           <Route path="/admin" component={TablePage} />
           <Route path="/signup" component={Signup} />
           <Route path="/signin" component={Signin} />
           <Route path="/discover" component={Discover} />
           <Route path="/password/forgot" component={ForgotPassword} />
           <Route path="/password/submit" component={ForgotPasswordSubmit} />
           <Route path="" component={NotFoundPage} />
          </Switch>
          <Footer />          
        </main>        

        <AppBar position="absolute" className={this.props.classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={this.props.classes.flex} noWrap>
              <Link to="/">
                zipstu
              </Link>                   
            </Typography>
            <Link to="/provider">
              <Button>+ Add a Profile</Button>
            </Link>
            { authed &&
              <Link to="/admin">
                <Button>Admin</Button>
              </Link>
            }    
            { authed &&
              <Link to="/dashboard/profile">
                <Button>Dashboard</Button>
              </Link>
            }                                                  
            <Link to="/signin">
              <Button>Sign In</Button>
            </Link>
            <Link to="/admin">
              <Button>+ FAQ</Button>
            </Link>
          </Toolbar>
        </AppBar>        
      </div>
    )
  }
}

App.propTypes = {
  // loggedIn: PropTypes.bool,
  // isAdmin: PropTypes.bool,
  authed: PropTypes.bool,
  classes: PropTypes.object,
  session: PropTypes.oneOfType([
    PropTypes.object, 
    PropTypes.bool
  ]),
}

export function mapDispatchToProps(dispatch) {
  return {
    onLoadSession: (evt) => {
      console.log('onLoadSession evt', evt);
      dispatch(loadSession())
    },
  };
}

const mapStateToProps = createStructuredSelector({
  session: sessionSelector(),
  authed: authedSelector(),
  loading: makeSelectLoading(),
});

// const withConnect = connect(mapStateToProps, mapDispatchToProps, null, {pure: false});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({key: 'session', reducer });
const withSaga = injectSaga({key: 'session', saga });


export default withRouter(compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(App));

