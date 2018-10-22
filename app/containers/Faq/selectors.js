import { createSelector } from 'reselect';

/**
 * Direct selector to the faq state domain
 */
const selectFaqDomain = (state) => state.get('faq');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Faq
 */

const makeSelectFaq = () => createSelector(
  selectFaqDomain,
  (substate) => substate.toJS()
);

export default makeSelectFaq;
export {
  selectFaqDomain,
};
