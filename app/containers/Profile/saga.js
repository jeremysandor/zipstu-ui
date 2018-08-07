import { push } from 'react-router-redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import Cookies from 'universal-cookie';

import { SAVE_PROFILE, FETCH_PROFILE } from './constants';
import { makeSelectProfileName, makeSelectStartHours, makeSelectEndHours, makeSelectHourlyPrice, makeSelectChangeAddress } from './selectors';
import { fetchProfileSuccess } from './actions';

export function* saveProfile() {
  const cookies = new Cookies();
  const profileName = yield select(makeSelectProfileName());
  const startHours = yield select(makeSelectStartHours());

  console.log('profileName', profileName)
  console.log('startHours', startHours)

  // let requestURL = `http://${process.env.WEB_SERVICE_HOST}:${process.env.WEB_SERVICE_PORT}/v1/providers`
  let requestURL = `http://${process.env.WEB_SERVICE_HOST}/v1/providers`

  try {
    const opts = {
      method: 'POST',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',
        'access-token'  : cookies.get('CognitoIdentityServiceProvider.4t5i21eueuj7okn1b99bepo9mq.21e8b1e1-9d06-4f79-8701-6174809ebe43.accessToken')
      },
      body: JSON.stringify({
        data: {
          profileName: profileName,
          startHours: startHours,
        }
      })
    }
    const provider = yield call(request, requestURL, opts);
    console.log('provider', provider)

  } catch (err) {
    console.log('err', err);
  }
}

export function* fetchProfile() {
  const cookies = new Cookies();
  const customerId = cookies.get('CognitoIdentityServiceProvider.4t5i21eueuj7okn1b99bepo9mq.LastAuthUser');
  // const profileName = yield select(makeSelectProfileName());
  // const startHours = yield select(makeSelectStartHours());

  // console.log('profileName', profileName)
  // console.log('startHours', startHours)

  // let requestURL = `http://${process.env.WEB_SERVICE_HOST}:${process.env.WEB_SERVICE_PORT}/v1/providers`
  let requestURL = `http://${process.env.WEB_SERVICE_HOST}/v1/providers/${customerId}`

  try {
    const opts = {
      method: 'GET',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',
        'access-token'  : cookies.get('CognitoIdentityServiceProvider.4t5i21eueuj7okn1b99bepo9mq.21e8b1e1-9d06-4f79-8701-6174809ebe43.accessToken')
      }
    }
    const provider = yield call(request, requestURL, opts);
    console.log('provider???', provider)
    yield put(fetchProfileSuccess(provider.data))
  } catch (err) {
    console.log('err', err);
  }
}



// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SAVE_PROFILE, saveProfile)
  yield takeLatest(FETCH_PROFILE, fetchProfile)
}
