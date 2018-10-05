import { createSelector } from 'reselect';

/**
 * Direct selector to the discover state domain
 */
const selectDiscoverDomain = (state) => state.get('discover');

/**
 * Other specific selectors
 */

const makeSelectLoading = () => createSelector(
  selectDiscoverDomain,
  (substate) => substate.get('loading')
); 

const makeSelectProfiles = () => createSelector(
  selectDiscoverDomain,
  (substate) => substate.get('profilesData')  
);


/**
 * Default selector used by Discover
 */

const makeSelectDiscover = () => createSelector(
  selectDiscoverDomain,
  (substate) => substate.toJS()
);

// export default makeSelectDiscover;
export {
  makeSelectDiscover,
  selectDiscoverDomain,
  makeSelectLoading,
  makeSelectProfiles,
};
