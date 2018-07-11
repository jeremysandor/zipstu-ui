import { createSelector } from 'reselect';

/**
 * Direct selector to the editProvider state domain
 */
const selectEditProviderDomain = (state) => state.get('editProvider');

/**
 * Other specific selectors
 */
 const makeSelectProfileName = () => createSelector(
  selectEditProviderDomain,
  (substate) => substate.get('profileName')
);

const makeSelectHours = () => createSelector(
  selectEditProviderDomain,
  (substate) => substate.get('hours')
);


/**
 * Default selector used by EditProvider
 */

const makeSelectEditProvider = () => createSelector(
  selectEditProviderDomain,
  (substate) => substate.toJS()
);

export {
  selectEditProviderDomain,
  makeSelectEditProvider,
  makeSelectProfileName,
  makeSelectHours
};
