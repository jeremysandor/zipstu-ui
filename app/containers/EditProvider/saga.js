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
        'access-token'  : cookies.get('access-token')
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
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LIST_SERVICE, listService)
}
