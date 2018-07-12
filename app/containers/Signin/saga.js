import { go, push } from 'react-router-redux';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import Cookies from 'universal-cookie';

import { SIGN_IN } from './constants'
import { makeSelectEmail, makeSelectPassword } from './selectors'

// auth
import { Auth } from 'aws-amplify';

export function* signin() {
  const email    = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const username = email;

  console.log('EMAIL?', email);
  console.log('PW?', password);

  let authenticated = false;
  yield Auth.signIn(username, password)
    .then(
        (data) => {
          console.log('data: ', data);
          const accessToken = data.signInUserSession.accessToken.jwtToken;
          const cookies = new Cookies();
          cookies.set('access-token', accessToken, { path: '/' });
          console.log(cookies.get('access-token'));
          authenticated = true;
        }
      )
    .catch(err => console.log(err));  

  // redirects back to the most recent
  // page in router history
  if (authenticated) {
    yield put(go(-1));  
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGN_IN, signin);
}
