/*
 *
 * Profile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SAVE_PROFILE,
  FETCH_PROFILE,
  FETCH_PROFILE_SUCCESS,
  CHANGE_PROFILE_NAME,
  CHANGE_START_HOURS,
  CHANGE_END_HOURS,
  CHANGE_HOURLY_PRICE,
  CHANGE_ADDRESS,   
} from './constants';

const initialState = fromJS({
  profileName: '',
  startHours: ''
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_PROFILE_SUCCESS:
      return state
        .set('profileName', action.profileName)
        .set('startHours', action.startHours)
    case CHANGE_PROFILE_NAME:
      return state
        .set('profileName', action.profileName)
    case CHANGE_START_HOURS:
      return state
        .set('startHours', action.startHours)
    case CHANGE_END_HOURS:
      return state
        .set('endHours', action.endHours)
    case CHANGE_HOURLY_PRICE:
      return state
        .set('hourlyPrice', action.hourlyPrice)
    case CHANGE_ADDRESS:
      return state
        .set('changeAddress', action.changeAddress)    
    default:
      return state;
  }
}

export default profileReducer;
