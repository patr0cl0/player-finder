import { combineReducers } from 'redux';
import playersReducer from './players';

export default combineReducers({
  players: playersReducer,
});
