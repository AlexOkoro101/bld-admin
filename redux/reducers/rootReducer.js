import { combineReducers } from 'redux';
import Auth from './authReducer';
import Collection from './collectionReducer';
const rootReducer = combineReducers({
  auth: Auth,
  collection: Collection,
});

export default rootReducer;
