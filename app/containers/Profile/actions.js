/*
 *
 * Profile actions
 *
 */

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
  GEOCODE_ADDRESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveProfile() {
  return {
    type: SAVE_PROFILE,
  };
}

export function fetchProfile() {
  return {
    type: FETCH_PROFILE,
  };
}

export function fetchProfileSuccess(profileData) {
  console.log('profileData', profileData)
  const {profileName, startHours, address} = profileData;
  return {
    type: FETCH_PROFILE_SUCCESS,
    profileName,
    startHours,
    address
  };
}

export function changeProfileName(profileName) {
  return {
    type: CHANGE_PROFILE_NAME,
    profileName
  };
}

export function changeStartHours(startHours) {
  return {
    type: CHANGE_START_HOURS,
    startHours
  };
}

export function changeEndHours(endHours) {
  return {
    type: CHANGE_END_HOURS,
    endHours
  };
}

export function changeHourlyPrice(hourlyPrice) {
  return {
    type: CHANGE_HOURLY_PRICE,
    hourlyPrice
  };
}

export function changeAddress(address) {
  return {
    type: CHANGE_ADDRESS,
    address
  };
}

export function changeLatLong(latLong) {
  return {
    type: GEOCODE_ADDRESS,
    latLong
  };
}









