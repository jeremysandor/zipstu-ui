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
import makeSelectEditProvider from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class EditProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>EditProvider</title>
          <meta name="description" content="Description of EditProvider" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

EditProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  editprovider: makeSelectEditProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
