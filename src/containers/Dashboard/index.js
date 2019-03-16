import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import { getPlayers } from '../../redux/reducers/players';
import { calculateAge } from '../../utils';
import Filters from './DashboardFilters';

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    minWidth: '100vw',
    maxWidth: '100vw',
    padding: theme.spacing.unit,
  },
  headerTitle: {
    color: theme.palette.primary.main,
  },
});

class Dashboard extends Component {
  componentDidMount() {
    const { fetchPlayers } = this.props;

    fetchPlayers();
  }

  render() {
    const { classes, players: { pending, data: players } } = this.props;

    return (
      <Grid
        container
        className={classes.root}
        spacing={16}
        hidden={pending}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="display1"
          >
            Football Player Finder
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Filters />
        </Grid>

        <Grid item md={6} xs={12}>
          <Paper>
            <PlayersTable data={players} />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.shape({
    asd: '',
  }).isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.shape({
    pending: PropTypes.bool,
    error: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = ({ players }) => ({
  players: {
    pending: players.pending,
    error: players.error,
    data: players.data.map(player => ({
      name: player.name,
      position: player.position,
      age: calculateAge(player.dateOfBirth),
    })),
  },
});

const mapDispatchToProps = { fetchPlayers: getPlayers };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
