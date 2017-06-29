import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  error: false,
  loading: false,
  signedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loading: true, error: false, signedIn: true };
    case LOGIN_USER_FAIL:
      return { ...state, error: true, loading: false, signedIn: false };
    default:
      return state;
  }
};