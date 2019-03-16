import {
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';
import { availablePositions } from '../../utils';

export const DashboardFilters = ({
  values: { name, age, position },
  errors,
  handleChange,
  handleSubmit,
}) => (
  <Grid container justify="center" spacing={16}>
    <Grid item xs={12} md={3}>
      <TextField
        fullWidth
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={name}
        error={!!errors.name}
        label={errors.name || 'Nombre'}
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <TextField
        fullWidth
        type="number"
        placeholder="Age"
        name="age"
        value={age}
        error={!!errors.age}
        label={errors.age || 'Age'}
        onChange={handleChange}
      />
    </Grid>

    <Grid item xs={12} md={3}>
      <TextField
        select
        fullWidth
        label="Position"
        name="position"
        value={position}
        onChange={handleChange}
      >
        {availablePositions.map(p => (
          <MenuItem key={p} value={p}>{p}</MenuItem>
        ))}
      </TextField>
    </Grid>

    <Grid item xs={12} md={3}>
      <Button
        fullWidth
        size="large"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Grid>
  </Grid>
);

DashboardFilters.defaultProps = {
  errors: {},
};

DashboardFilters.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.number,
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.string,
  }),
};

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    position: 'any',
    age: 18,
  }),
  validationSchema: yup.object({
    name: yup
      .string()
      // The regex match all and ONLY alphabetic characters.
      .matches(/^[a-zA-Z|Ñ|ñ|\-| ]+$/, 'Name can only contain characters'),
    age: yup
      .number()
      .transform(age => Number(age))
      .min(18, 'Minimun age is 18')
      .max(40, 'Maximun age is 40'),
  }),
  handleSubmit: (values) => {
    console.log(values);
    // try {
    // } catch (error) {

    // }
  },
})(DashboardFilters);
