//
import {
  GET_COLLECTION_SUCCESS,
  GET_COLLECTION_FAILED,
  GET_COLLECTION,
  GET_COLLECTION_DETAIL,
} from '../types';
//
const initialState = {
  userLoggedIn: false,
  loading: false,
  collectionDetail: {},
  collections: [],
};

const Collection = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        ...state,
        loading: true,
      };
    case GET_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: action.payload,
        loading: false,
      };
    case GET_COLLECTION_DETAIL:
      return {
        ...state,
        collectionDetail: action.payload,
        loading: false,
      };
    case GET_COLLECTION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default Collection;
