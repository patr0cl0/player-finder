import Axios from 'axios';
import { calculateAge } from '../../utils';
// Actions types
const GET_PLAYERS_PENDING = 'players-finder/players/GET_PLAYERS_PENDING';
const GET_PLAYERS_SUCCESS = 'players-finder/players/GET_PLAYERS_SUCCESS';
const GET_PLAYERS_FAIL = 'players-finder/players/GET_PLAYERS_FAIL';
const FILTER_PLAYERS = 'players-finder/players/FILTER_PLAYERS';

// Reducer initial state
const initalState = {
  pending: false,
  error: '',
  data: [],
  filteredData: [],
};

// Needed variables
const {
  REACT_PLAYERS_URI = 'https://football-players-b31f2.firebaseio.com/players.json',
  DEFAULT_ERROR_MESSAGE = 'There has been an error fetching your data, please, try again please',
} = process.env;

// Reducer
export default function reducer(state = initalState, action) {
  switch (action.type) {
    case GET_PLAYERS_PENDING:
      return {
        ...state,
        pending: true,
      };

    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        filteredData: action.payload,
      };
    case FILTER_PLAYERS:
      return {
        ...state,
        filteredData: action.payload,
      };

    case GET_PLAYERS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

// Action Creators
export const getPlayersPending = () => ({
  type: GET_PLAYERS_PENDING,
});

export const getPlayersSuccess = payload => ({
  type: GET_PLAYERS_SUCCESS,
  payload,

});

export const getPlayersFail = payload => ({
  type: GET_PLAYERS_FAIL,
  payload,
});

// Actions
export const getPlayers = () => async (dispatch) => {
  try {
    dispatch(getPlayersPending());
    const res = await Axios.get(REACT_PLAYERS_URI);

    dispatch(getPlayersSuccess(res.data));
  } catch (error) {
    dispatch(getPlayersFail(DEFAULT_ERROR_MESSAGE));
  }
};

// Expected filters: by name, by age and by position.
export const filterPlayers = filters => (dispatch, getState) => {
  const { players: { data } } = getState();
  const { name, age, position } = filters;

  // Loop through players and check if the player match the filter.
  const filteredPlayers = data.filter((player) => {
    if (name && !player.name.includes(name)) {
      return false;
    }

    if (position && position !== 'none' && player.position !== position) {
      return false;
    }

    if (age && age !== 'none' && calculateAge(player.dateOfBirth) !== age) {
      return false;
    }

    return true;
  });


  dispatch({ type: FILTER_PLAYERS, payload: filteredPlayers });
};
