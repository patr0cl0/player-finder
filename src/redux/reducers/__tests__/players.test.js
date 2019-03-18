import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import playersReducer, {
  GET_PLAYERS_PENDING,
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAIL,
  FILTER_PLAYERS,
  getPlayers,
  filterPlayers,
} from '../players';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

const playersReducerInitialState = {
  pending: false,
  error: '',
  data: [],
  filteredData: [],
};

const fakePlayersData = [{
  contractUntil: '2022-06-30',
  dateOfBirth: '1993-05-13',
  jerseyNumber: 9,
  name: 'Romelu Lukaku',
  nationality: 'Belgium',
  position: 'Centre-Forward',
}, {
  contractUntil: '2019-06-30',
  dateOfBirth: '1990-11-07',
  jerseyNumber: 1,
  name: 'David de Gea',
  nationality: 'Spain',
  position: 'Keeper',
}];

let store;
let httpMock;
let playersState;

// This is pure magic.
const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

describe('Player\'s reducer', () => {
  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it('should get expected initial state correctly', () => {
    expect(playersReducer(undefined, {})).toEqual(playersReducerInitialState);
  });

  it('should update state correctly after fetch the players data', () => {
    // const beforeFetchingPlayersState = { ...playersReducerInitialState };
    const fetchingPlayersAction = { type: GET_PLAYERS_SUCCESS, payload: { ...fakePlayersData } };
    playersState = playersReducer(playersState, fetchingPlayersAction);

    expect(playersState).toEqual({
      ...playersReducerInitialState,
      data: { ...fakePlayersData },
      filteredData: { ...fakePlayersData },
    });
  });

  it('should filter the players correctly with the given params', () => {
    const mockFilterInput = {
      name: '',
      age: 28,
      position: 'Keeper',
    };

    const mockGetState = () => ({
      players: {
        data: fakePlayersData,
      },
    });

    filterPlayers(mockFilterInput)(store.dispatch, mockGetState);

    expect(store.getActions()).toEqual([
      { type: FILTER_PLAYERS, payload: [fakePlayersData[1]] },
    ]);
  });


  it('Should fetch players correctly', async () => {
    httpMock.onGet('https://football-players-b31f2.firebaseio.com/players.json').reply(200, fakePlayersData);

    getPlayers()(store.dispatch);

    await flushAllPromises();

    expect(store.getActions()).toEqual([
      { type: GET_PLAYERS_PENDING },
      { type: GET_PLAYERS_SUCCESS, payload: fakePlayersData },
    ]);
  });
});
