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
         makeSelectHourlyPrice, makeSelectChangeAddress, makeSelectGeocodeAddress } from './selectors'
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { saveProfile, fetchProfile, changeProfileName, changeStartHours, changeEndHours,
         changeHourlyPrice, changeAddress, changeLatLong } from './actions'

// Google maps autocomplete 
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

// material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';         

export class Profile extends React.PureComponent {

  componentDidMount() {
    console.log('PROFILE componentDidMount props', this.props)
    this.props.fetchProfile();
  }

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
                id="profileName"
                type="text"
                label="Profile Name"
                value={this.props.profileName}
                onChange={this.props.onChangeProfileName}
              />
            </label><br /><br />

            <label htmlFor="startHours">
              <TextField
                id="startHours"
                type="startHours"
                label="Start Hours"
                value={this.props.startHours}
                onChange={this.props.onChangeStartHours}
              />
            </label><br /><br />


            <PlacesAutocomplete
              value={this.props.address}
              onChange={this.props.onChangeAddress}
              onSelect={this.props.onSelectAddress}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    label="Address"
                    // value={this.props.address}
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>



            <Button type="submit" color="primary">
              Save Profile
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
  address: PropTypes.string,
  latLong: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  profileName: makeSelectProfileName(),
  startHours: makeSelectStartHours(),
  address: makeSelectChangeAddress(),
  latLong: makeSelectGeocodeAddress(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeProfileName: (evt) => dispatch(changeProfileName(evt.target.value)),
    onChangeStartHours: (evt) => dispatch(changeStartHours(evt.target.value)),
    onChangeAddress: (value) =>  {
      dispatch(changeAddress(value));
    },
    onSelectAddress: async (value) =>  {
      console.log('onSelectAddress', value)
      dispatch(changeAddress(value));
      const results = await geocodeByAddress(value);
      console.log('results', results);
      const latLng = await getLatLng(results[0]);
      console.log('latLng', latLng);
      dispatch(changeLatLong(latLng));
    },    
    onSubmitForm: (evt) => {
      console.log('EVT', evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(saveProfile());
    },
    fetchProfile: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchProfile());
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
