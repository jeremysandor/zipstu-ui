/*
 *
 * Discover reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_PROFILES,
  FETCH_PROFILES_SUCCESS,  
} from './constants';

const initialState = fromJS({
  loading: true,
});

function discoverReducer(state = initialState, action) {
  console.log('*** action', action)
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_PROFILES_SUCCESS:
      return state
        .set('profilesData', action.profilesData)   
        .set('loading', false) 
    default:
      return state;
  }
}

export default discoverReducer;
