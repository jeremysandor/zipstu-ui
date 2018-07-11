/*
 *
 * EditProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_PROFILE_NAME,
  CHANGE_HOURS,    
} from './constants';

const initialState = fromJS({});

function editProviderReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_PROFILE_NAME:
      return state
        .set('profileName', action.profileName)
    case CHANGE_HOURS:
      return state
        .set('hours', action.hours)        
    default:
      return state;
  }
}

export default editProviderReducer;
