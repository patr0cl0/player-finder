import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';

const PlayersTable = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Player</TableCell>
        <TableCell>Position</TableCell>
        <TableCell>Age</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(player => (
        <TableRow key={player.name + player.position} className="PlayersTable--row">
          <TableCell>{player.name}</TableCell>
          <TableCell>{player.position}</TableCell>
          <TableCell>{player.age}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

PlayersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
    age: PropTypes.number,
  })).isRequired,
};


export default PlayersTable;
