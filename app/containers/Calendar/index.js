/**
 *
 * Calendar
 *
 */

import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCalendar from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import CalendarStyle from './CalendarStyle.css'

BigCalendar.momentLocalizer(moment);

export class Calendar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const myEventsList = [
      {
        allDay: false,
        startDate: new Date('August 1, 2018 11:00:00'),
        endDate: new Date('August 1, 2018 13:00:00'),
        title: 'Booking with Scotty Summers',
        desc: 'Big conference for important people',
      },
      {
        allDay: true,
        startDate: new Date('July 31, 2018 11:13:00'),
        endDate: new Date('July 31, 2018 11:13:00'),
        title: 'All Day Event',
        desc: 'Big conference for important people',
      }
    ]

    return (
      <div>
        <Helmet>
          <title>Calendar</title>
          <meta name="description" content="Description of Calendar" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <BigCalendar
          events={myEventsList}
          startAccessor='startDate'
          endAccessor='endDate'
          // selectable
          defaultView='week'
          // step={30}
          // timeslots={2}
          // onSelectEvent={event => this.onEventClick(event)}
          // onSelectSlot={(slotInfo) => this.onSlotChange(slotInfo) }
        />

      </div>
    );
  }
}

Calendar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  calendar: makeSelectCalendar(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'calendar', reducer });
const withSaga = injectSaga({ key: 'calendar', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Calendar);
