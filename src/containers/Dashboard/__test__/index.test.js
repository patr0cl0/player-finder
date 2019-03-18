import React from 'react';
import { shallow } from 'enzyme';
import ConnectedDashboard, { Dashboard } from '../index';

const mockPlayersData = [
  {
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
  },
];

const mockDashboardProps = {
  players: {
    pending: false,
    data: [],
  },
  classes: {},
  filterPlayers: jest.fn(),
  getPlayers: jest.fn(),
};

describe('Dashboard tests', () => {
  it('should render properly and fetch players', () => {
    const component = shallow(<Dashboard {...mockDashboardProps} />);

    expect(component).toMatchSnapshot();
    expect(mockDashboardProps.getPlayers).toHaveBeenCalled();
  });

  it('should render properly with players', () => {
    const mockDataWithPlayers = {
      ...mockDashboardProps,
      players: {
        ...mockDashboardProps,
        data: [...mockPlayersData],
      },
    };

    const component = shallow(<Dashboard {...mockDataWithPlayers} />);

    expect(component).toMatchSnapshot();
  });
});
