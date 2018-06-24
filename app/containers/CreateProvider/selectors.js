import { createSelector } from 'reselect';

/**
 * Direct selector to the createProvider state domain
 */
const selectCreateProviderDomain = (state) => state.get('createProvider');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CreateProvider
 */

const makeSelectCreateProvider = () => createSelector(
  selectCreateProviderDomain,
  (substate) => substate.toJS()
);

export default makeSelectCreateProvider;
export {
  selectCreateProviderDomain,
};
