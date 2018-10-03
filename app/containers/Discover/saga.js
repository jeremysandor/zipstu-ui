import { push } from 'react-router-redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import Cookies from 'universal-cookie';

import { FETCH_PROFILES } from './constants';
import {} from './selectors';
import { fetchProfilesSuccess } from './actions';


export function* fetchProfiles() {
  const cookies = new Cookies();
  const customerId = cookies.get('CognitoIdentityServiceProvider.4t5i21eueuj7okn1b99bepo9mq.LastAuthUser');
  // const profileName = yield select(makeSelectProfileName());
  // const startHours = yield select(makeSelectStartHours());

  // console.log('profileName', profileName)
  // console.log('startHours', startHours)

  // let requestURL = `http://${process.env.WEB_SERVICE_HOST}:${process.env.WEB_SERVICE_PORT}/v1/providers`
  let requestURL = `http://${process.env.WEB_SERVICE_HOST}/v1/providers`

  try {
    const opts = {
      method: 'GET',
      headers : {
        'Accept'        : 'application/json',
        'Content-Type'  : 'application/json',
        'access-token'  : cookies.get('CognitoIdentityServiceProvider.4t5i21eueuj7okn1b99bepo9mq.21e8b1e1-9d06-4f79-8701-6174809ebe43.accessToken')
      }
    }
    const providers = yield call(request, requestURL, opts);
    console.log('providers???', providers)
    yield put(fetchProfilesSuccess(providers))
  } catch (err) {
    console.log('err', err);
  }
}


export default function* defaultSaga() {
  yield takeLatest(FETCH_PROFILES, fetchProfiles)
}
