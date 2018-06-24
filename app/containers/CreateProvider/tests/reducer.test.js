
import { fromJS } from 'immutable';
import createProviderReducer from '../reducer';

describe('createProviderReducer', () => {
  it('returns the initial state', () => {
    expect(createProviderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
