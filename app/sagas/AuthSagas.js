import { AsyncStorage } from 'react-native';
import {
  put, takeLatest,
  all, call,
} from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

import {
  showSpinner, loginSuccess,
  loginFail, syncUser,
} from '../actions';
import { actionTypes, signinMethods } from '../config';

// worker Saga: will be called on GOOGLE_LOGIN_REQUESTED actions
function* loginUserWithGoogle(action) {
  const auth = firebase.auth();
  try {
    // get the id token from google
    const user = yield call([GoogleSignin, GoogleSignin.signIn]);
    yield put(showSpinner());
    // create a firebase credential using that
    const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
    const userCred = yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);
    // sign in to firebase and get the user credentials

    yield call(initUser, action, userCred);
  } catch (error) {
    // Error handling for login cancellation by user
    if (error.code !== 12501) {
      // error code 12501 is just when the user cancels the sign in by pressing outside the modal
      yield put(loginFail(`There was an error logging you in, error code: ${error.code}.`));
    }
  }
}

// worker Saga: will be called on FB_LOGIN_REQUESTED actions
function* loginUserWithFB(action) {
  const auth = firebase.auth();
  try {
    // login to fb
    const result = yield call([LoginManager, LoginManager.logInWithReadPermissions], ['public_profile', 'email']);
    if (result.isCancelled) return;
    // get the user id token
    const user = yield call([AccessToken, AccessToken.getCurrentAccessToken]);
    // get a firebase credential using the user id token
    const credential = firebase.auth.FacebookAuthProvider.credential(user.accessToken);
    // sign in to firebase and get the user credentials
    const userCred = yield call([auth, auth.signInAndRetrieveDataWithCredential], credential);

    yield call(initUser, action, userCred);

    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFail(`There was an error logging you in, error code: ${error.code}.`));
  }
}

// worker Saga: will be called on LOGOUT actions
function* logoutUser() {
  const auth = firebase.auth();
  try {
    // get the sign in method
    const method = JSON.parse(yield call([AsyncStorage, AsyncStorage.getItem], 'signin_method'));
    // sign out using the same api used to sign in
    switch (method) {
      case signinMethods.GOOGLE:
        yield call([GoogleSignin, GoogleSignin.signOut]);
        break;
      case signinMethods.FB:
        yield call([LoginManager, LoginManager.logOut]);
        break;
      default:
        break;
    }
    yield put({ type: actionTypes.AUTH.LOGOUT.SUCCESS });
    // clear the async storage to prevent mixup with future logins
    AsyncStorage.clear();
    // clear user state to prevent mixup with future login
    yield put(syncUser(null));
    // sign out from firebase
    auth.signOut();
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.AUTH.LOGOUT.FAIL });
  }
}

function* initUser(action, userCred) {
  console.log('init');
  // get a db reference to the user
  const user = userCred.user._user;
  const userRef = firebase.firestore().collection('students').doc(user.uid);

  let userData;
  // check if the user already exists
  if (userCred.additionalUserInfo.isNewUser) {
    // create a new user in firebase
    userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      phone: user.phone,
      showChatNotification: true,
      showClassNotification: false,
      donePref: false,
    };
    yield call([userRef, userRef.set], userData);
  } else {
    // get the existing user data and store it
    const doc = yield call([userRef, userRef.get]);
    userData = doc.data();
  }

  // store the user path and user data in the cache
  yield call([AsyncStorage, AsyncStorage.setItem], 'user_data', JSON.stringify(userData));
  yield call([AsyncStorage, AsyncStorage.setItem], 'signin_method', JSON.stringify(action.method));
  yield put(loginSuccess());
  console.log('done');
}

export function* watchLoginRequests() {
  yield all([
    takeLatest(actionTypes.AUTH.LOGIN.GOOGLE, loginUserWithGoogle),
    takeLatest(actionTypes.AUTH.LOGIN.FB, loginUserWithFB),
    takeLatest(actionTypes.AUTH.LOGOUT.REQUEST, logoutUser),
  ]);
}
