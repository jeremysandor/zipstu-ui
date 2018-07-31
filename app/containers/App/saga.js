/**
 * Gets the repositories of the user from Github
 */
// import config from '../../../config';
import { call, put, select, takeLatest, take } from 'redux-saga/effects';
import { LOAD_SESSION } from './constants';
import { setAuthenticated, loadSession, sessionLoaded, gameLoadingError } from './actions';

import request from 'utils/request';
// import { makeSelectUsername } from 'containers/HomePage/selectors';
import { sessionSelector } from './selectors';

// auth
import { Auth } from 'aws-amplify';

/**
 * Games request/response handler
 */
export function* fetchSession() {
  console.log('FETCH SESSION');
  try {
    let session = yield Auth.currentSession();
    console.log('session', session);
    yield put.resolve(setAuthenticated(true));
  } catch (err) {
    console.log('err', err);
    yield put.resolve(setAuthenticated(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sessionData() {
  // Watches for LOAD_SESSION actions and calls fetchSession when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SESSION, fetchSession);
}
