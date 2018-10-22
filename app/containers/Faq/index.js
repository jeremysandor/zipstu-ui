/**
 *
 * Faq
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
import makeSelectFaq from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Faq extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Faq</title>
          <meta name="description" content="Description of Faq" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Faq.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  faq: makeSelectFaq(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'faq', reducer });
const withSaga = injectSaga({ key: 'faq', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Faq);
