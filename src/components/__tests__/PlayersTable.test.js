import React from 'react';
import { shallow } from 'enzyme';
import PlayersTable from '../PlayersTable';

const playersTableMockProps = {
  data: [{
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
  }],
};

describe('PlayersTable tests', () => {
  it('should match the snapshot', () => {
    const component = shallow(<PlayersTable {...playersTableMockProps} />);

    expect(component).toMatchSnapshot();
  });

  it('should render two rows', () => {
    const component = shallow(<PlayersTable {...playersTableMockProps} />);

    const rows = component.find('.PlayersTable--row');

    expect(rows.length).toBe(2);
  });
});
