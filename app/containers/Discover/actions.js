/*
 *
 * Discover actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_PROFILES,
  FETCH_PROFILES_SUCCESS,  
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchProfiles() {
  return {
    type: FETCH_PROFILES,
  };
}


export function fetchProfilesSuccess(profilesData) {
  console.log('profilesData', profilesData)
  // const {profileName, startHours, address} = profilesData;
  return {
    type: FETCH_PROFILES_SUCCESS,
    profilesData
  };
}
