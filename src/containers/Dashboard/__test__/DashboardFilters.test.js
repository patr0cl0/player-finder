import React from 'react';
import { shallow } from 'enzyme';
import FormFilters, { DashboardFilters } from '../DashboardFilters';

const dashboardFiltersMockProps = {
  values: {},
  handleSubmit: jest.fn(),
  handleChange: jest.fn(),
};

describe('Dashboard component', () => {
  it('Should render formik filters form correctly', () => {
    const component = shallow(<FormFilters />);

    expect(component).toMatchSnapshot();
  });

  it('Should render formik inner form correctly', () => {
    const component = shallow(<DashboardFilters {...dashboardFiltersMockProps} />);

    expect(component).toMatchSnapshot();
  });
});
