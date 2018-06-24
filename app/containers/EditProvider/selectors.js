import { createSelector } from 'reselect';

/**
 * Direct selector to the editProvider state domain
 */
const selectEditProviderDomain = (state) => state.get('editProvider');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditProvider
 */

const makeSelectEditProvider = () => createSelector(
  selectEditProviderDomain,
  (substate) => substate.toJS()
);

export default makeSelectEditProvider;
export {
  selectEditProviderDomain,
};
