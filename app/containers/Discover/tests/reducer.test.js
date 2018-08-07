
import { fromJS } from 'immutable';
import discoverReducer from '../reducer';

describe('discoverReducer', () => {
  it('returns the initial state', () => {
    expect(discoverReducer(undefined, {})).toEqual(fromJS({}));
  });
});
