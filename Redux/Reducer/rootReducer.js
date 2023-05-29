import {combineReducers} from 'redux';
import TokenReducer from './tokenReducer';
import setUserData from './UserDataReducer';
import browseData from './browseReducer';
import SearchData from './searchReducer';
import mediaData from './mediaReducer';
export default combineReducers({
  TokenReducer,
  setUserData,
  mediaData,
  browseData,
  SearchData,
});
