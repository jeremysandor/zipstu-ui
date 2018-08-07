/**
 *
 * Discover
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
import makeSelectDiscover from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Discover extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Discover</title>
          <meta name="description" content="Description of Discover" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Discover.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  discover: makeSelectDiscover(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'discover', reducer });
const withSaga = injectSaga({ key: 'discover', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Discover);
