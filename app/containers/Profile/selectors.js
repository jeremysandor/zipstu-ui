import { createSelector } from 'reselect';

/**
 * Direct selector to the profile state domain
 */
const selectProfileDomain = (state) => state.get('profile');

/**
 * Other specific selectors
 */

const makeSelectProfileName = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('profileName')
);

const makeSelectStartHours = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('startHours')
);

const makeSelectEndHours = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('endHours')
);

const makeSelectHourlyPrice = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('hourlyPrice')
);

const makeSelectChangeAddress = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('address')
);

const makeSelectGeocodeAddress = () => createSelector(
  selectProfileDomain,
  (substate) => substate.get('latLong')
);

/**
 * Default selector used by Profile
 */

const makeSelectProfile = () => createSelector(
  selectProfileDomain,
  (substate) => substate.toJS()
);


export {
  selectProfileDomain,
  makeSelectProfile,
  makeSelectProfileName,
  makeSelectStartHours,
  makeSelectEndHours,
  makeSelectHourlyPrice,
  makeSelectChangeAddress,
  makeSelectGeocodeAddress,
};
