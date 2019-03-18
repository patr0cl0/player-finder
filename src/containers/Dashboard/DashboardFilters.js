import {
  Button,
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { Formik, withFormik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as yup from 'yup';
import { availablePositions, availablePlayerAges } from '../../utils';

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
        select
        fullWidth
        label="Age"
        name="age"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value="none">{' '}</MenuItem>

        {availablePlayerAges.map(a => (
          <MenuItem key={a} value={a}>{a}</MenuItem>
        ))}
      </TextField>
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
        <MenuItem value="none">{' '}</MenuItem>

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
    age: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.string,
  }),
};

const mapPropsToValues = () => ({
  name: '',
  position: 'none',
  age: 'none',
})

const validationSchema = yup.object({
  name: yup
    .string()
    // The regex match all and ONLY alphabetic characters.
    .matches(/^[a-zA-Z|Ñ|ñ|\-| ]+$/, 'Name can only contain characters'),
})

const handleSubmit = (values, { props }) => {
  const { onSubmit } = props;

  onSubmit(values);
}

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(DashboardFilters);
