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
import { makeSelectDiscover } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { fetchProfiles } from './actions';

// google map
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// material ui
import Grid from '@material-ui/core/Grid';

const MyMapComponent = withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 37.8044, lng: -122.2711 }}
    onDragEnd={props.onDragEnd}
  >
    {console.log('props', props)}
    {props.isMarkerShown && <Marker position={{ lat: 37.8044, lng: -122.2711 }} />}
    {props.isMarkerShown && <Marker position={{ lat: 37.8044, lng: -121.2711 }} />}
  </GoogleMap>
)

export class Discover extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('DISCOVER componentDidMount props', this.props)
    this.props.fetchProfiles();
  }

  handleMapDrag() {
    console.log('handleMapDrag', this);
    const center = this.getCenter();
    console.log('center', center.lat(), center.lng());
    const bounds = this.getBounds();
    console.log('bounds', bounds);

    console.log('this.props', this);
    // this.props.history.push({
    //   pathname: this.props.history.location.pathname,
    //   search: `?tags=${ selectedTags }`      
    // })
  }
 
  render() {

    return (
      <div>
        <Helmet>
          <title>Discover</title>
          <meta name="description" content="Description of Discover" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            Grid item 1
          </Grid>
          <Grid item xs={12} sm={6}>
            <MyMapComponent
              foo={['bar', 'baz']} 
              isMarkerShown 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `700px` }} />}
              mapElement={<div style={{ height: `100%` }} />}   
              // onMapLoad={this.handleMapLoad()} 
              onDragEnd={this.handleMapDrag}
            />
          </Grid>          
        </Grid>        



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
    fetchProfiles: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchProfiles());
    },     
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
