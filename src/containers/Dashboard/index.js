import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayersTable from '../../components/PlayersTable';
import { getPlayers, filterPlayers } from '../../redux/reducers/players';
import { calculateAge } from '../../utils';
import Filters from './DashboardFilters';
import { createSelector } from 'reselect';

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

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getPlayers();
  }

  handleFilterSubmit = (data) => {
    this.props.filterPlayers(data);
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
          <Filters
            onSubmit={this.handleFilterSubmit}
          />
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
  getPlayers: PropTypes.func.isRequired,
  filterPlayers: PropTypes.func.isRequired,
  players: PropTypes.shape({
    pending: PropTypes.bool,
    // error: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }).isRequired,
};

const getPlayersSelec = state => state.filteredData;

const filteredPlayersSelector = createSelector(
  getPlayersSelec,
  (players) => players.map(player => ({
    name: player.name,
    position: player.position,
    age: calculateAge(player.dateOfBirth),
  }))
);


const mapStateToProps = ({ players }) => ({
  players: {
    pending: players.pending,
    data: filteredPlayersSelector(players)
  },
});

const mapDispatchToProps = { getPlayers, filterPlayers };

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
