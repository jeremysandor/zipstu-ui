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

  Auth.signIn(username, password)
    .then(
        (data) => {
          console.log('data: ', data);
          const accessToken = data.signInUserSession.accessToken.jwtToken;
          const cookies = new Cookies();
          cookies.set('access-token', accessToken, { path: '/' });
          console.log(cookies.get('access-token')); 
        }
      )
    .catch(err => console.log(err));  
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGN_IN, signin);
}
