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
import { makeSelectDiscover, makeSelectProfiles, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { fetchProfiles } from './actions';

// google map
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

// material ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 700,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

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
    this.props.fetchProfiles();
    console.log('DISCOVER componentDidMount props', this.props)
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
    console.log('render this.props', this.props)
    const {loading, profilesData} = this.props
    console.log('profilesData', profilesData)

    if (loading) return <div>loading...</div>;

    return (
      <div>
        <Helmet>
          <title>Discover</title>
          <meta name="description" content="Description of Discover" />
        </Helmet>
        <FormattedMessage {...messages.header} />

        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <div className={this.props.classes.root}>
              <GridList cellHeight={200} className={this.props.classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  <ListSubheader component="div">December</ListSubheader>
                </GridListTile>
                  
                  {this.props.profilesData.map(tile => (
                    <GridListTile key={tile.img}>
                      <img src={tile.img} alt={tile.title} />
                      <GridListTileBar
                        title={tile.title}
                        subtitle={<span>by: {tile.author}</span>}
                        actionIcon={
                          <IconButton className={this.props.classes.icon}>
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </GridListTile>
                  ))}

              </GridList>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>

            <MyMapComponent
              foo={['bar', 'baz']} 
              isMarkerShown 
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{  height: `100%`}} />}
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
  classes: PropTypes.object,
  profilesData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  discover: makeSelectDiscover(),
  profilesData: makeSelectProfiles(),
  loading: makeSelectLoading(),
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
  withStyles(styles),
)(Discover);
