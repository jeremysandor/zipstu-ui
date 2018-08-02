/**
 *
 * Profile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectProfile, makeSelectProfileName, makeSelectStartHours, makeSelectEndHours, 
         makeSelectHourlyPrice, makeSelectChangeAddress } from './selectors'
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { saveProfile, changeProfileName, changeStartHours, changeEndHours,
         changeHourlyPrice, changeAddress } from './actions'

// material ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from '@material-ui/core/styles';         

export class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Zipstu Profile</title>
          <meta name="description" content="Zipstu Profile" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <div>
          <form onSubmit={this.props.onSubmitForm}>
            
            <label htmlFor="profileName">
              <TextField
                autoFocus
                id="profileName"
                type="text"
                label="Profile Name"
                value={this.props.profileName}
                onChange={this.props.onChangeProfileName}
              />
            </label><br />

            <label htmlFor="startHours">
              <TextField
                id="startHours"
                type="startHours"
                label="Start Hours"
                value={this.props.startHours}
                onChange={this.props.onChangeStartHours}
              />
            </label><br />           

            <Button type="submit" color="primary">
              List Service
            </Button>
          </form>
        </div>

      </div>
    );
  }
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func,
  profileName: PropTypes.string,
  startHours: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeProfileName: (evt) => dispatch(changeProfileName(evt.target.value)),
    onChangeStartHours: (evt) => dispatch(changeStartHours(evt.target.value)),    
    onSubmitForm: (evt) => {
      console.log('EVT', evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(saveProfile());
    },          
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profile', reducer });
const withSaga = injectSaga({ key: 'profile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Profile);
