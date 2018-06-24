
import { fromJS } from 'immutable';
import editProviderReducer from '../reducer';

describe('editProviderReducer', () => {
  it('returns the initial state', () => {
    expect(editProviderReducer(undefined, {})).toEqual(fromJS({}));
  });
});
