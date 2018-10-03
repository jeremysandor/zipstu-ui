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

const initialState = fromJS({});

function discoverReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_PROFILES_SUCCESS:
      return state
        .set('profileName', action.profileName)
        .set('startHours', action.startHours)
        .set('address', action.address)      
    default:
      return state;
  }
}

export default discoverReducer;
