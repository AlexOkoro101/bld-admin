//
//
import { enviroment } from '../../src/components/environment';
import {
  GET_COLLECTION_SUCCESS,
  GET_COLLECTION_FAILED,
  GET_COLLECTION,
} from '../types';
//
//
const api = enviroment.BASE_URL;
//
export const getCollections = () => (dispatch) => {
  dispatch({
    type: GET_COLLECTION,
  });
  fetch(api + 'collections', {
    method: 'GET',
    redirect: 'follow',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      dispatch({
        type: GET_COLLECTION_SUCCESS,
        payload: data.data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: GET_COLLECTION_FAILED,
        payload: error.message,
      });
      console.log(error);
    });
};
export const logOut = () => (dispatch) => {
  dispatch({
    type: GET_COLLECTION_FAILED,
  });
};
