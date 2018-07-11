/**
 *
 * EditProvider
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
import {makeSelectEditProvider, makeSelectProfileName, makeSelectHours} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// actions
import { listService, changeProfileName, changeHours } from './actions'

// material ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export class EditProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>List a Service</title>
          <meta name="description" content="Description of EditProvider" />
        </Helmet>

        Just the basics:
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

            <label htmlFor="hours">
              <TextField
                id="hours"
                type="hours"
                label="Hours"
                value={this.props.hours}
                onChange={this.props.onChangeHours}
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

EditProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func,
  profileName: PropTypes.string,
  hours: PropTypes.string,
  onChangeProfileName: PropTypes.func,
  onChangeHours: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  editprovider: makeSelectEditProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeProfileName: (evt) => dispatch(changeProfileName(evt.target.value)),
    onChangeHours: (evt) => dispatch(changeHours(evt.target.value)),    
    onSubmitForm: (evt) => {
      console.log('EVT', evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(listService());
    },      
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editProvider', reducer });
const withSaga = injectSaga({ key: 'editProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditProvider);
