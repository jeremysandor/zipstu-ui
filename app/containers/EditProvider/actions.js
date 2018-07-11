/*
 *
 * EditProvider actions
 *
 */

import {
  DEFAULT_ACTION,
  LIST_SERVICE,
  CHANGE_PROFILE_NAME,
  CHANGE_HOURS,  
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function listService() {
  return {
    type: LIST_SERVICE,
  }
}

export function changeProfileName(profileName) {
  console.log('CHANGE_PROFILE_NAME action')
  return {
    type: CHANGE_PROFILE_NAME,
    profileName
  }
}

export function changeHours(hours) {
  return {
    type: CHANGE_HOURS,
    hours
  }
}
