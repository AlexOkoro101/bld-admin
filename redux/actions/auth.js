//
//
import { LOGIN_FAILED, LOGIN_SUCCESS } from '../types';
//
//
export const logIn = () => (dispatch) => {
  dispatch({
    type: LOGIN_SUCCESS,
  });
};
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOGIN_FAILED,
  });
};
