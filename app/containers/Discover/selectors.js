import { createSelector } from 'reselect';

/**
 * Direct selector to the discover state domain
 */
const selectDiscoverDomain = (state) => state.get('discover');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Discover
 */

const makeSelectDiscover = () => createSelector(
  selectDiscoverDomain,
  (substate) => substate.toJS()
);

export default makeSelectDiscover;
export {
  selectDiscoverDomain,
};
