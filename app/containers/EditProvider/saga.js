import { push } from 'react-router-redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import Cookies from 'universal-cookie';

import { LIST_SERVICE } from './constants'
import { makeSelectProfileName, makeSelectHours } from './selectors'

export function* listService() {
  const cookies = new Cookies();
  const profileName = yield select(makeSelectProfileName());
  const hours       = yield select(makeSelectHours());

  console.log('profileName', profileName)
  console.log('hours', hours)

  // let requestURL = `http://${process.env.WEB_SERVICE_HOST}:${process.env.WEB_SERVICE_PORT}/v1/providers`
  let requestURL = `http://${process.env.WEB_SERVICE_HOST}:45000/v1/providers`

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
          hours: hours
        }
      })
    }
    const provider = yield call(request, requestURL, opts);
    console.log('provider', provider)
  } catch (err) {
    console.log('err', err);

    // this needs to be based on a 401
    yield put(push("/signin"))
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LIST_SERVICE, listService)
}
