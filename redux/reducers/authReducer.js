//
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../types';
//
const initialState = {
  userLoggedIn: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        userLoggedIn: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        userLoggedIn: false,
      };
    default:
      return state;
  }
};
export default Auth;
