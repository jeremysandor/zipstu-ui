/**
 *
 * CreateProvider
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
import makeSelectCreateProvider from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class CreateProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>CreateProvider</title>
          <meta name="description" content="Description of CreateProvider" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

CreateProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  createprovider: makeSelectCreateProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'createProvider', reducer });
const withSaga = injectSaga({ key: 'createProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CreateProvider);
