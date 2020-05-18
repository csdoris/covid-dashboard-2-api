import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import NumberFormat from 'react-number-format';

import BigCircularProgress from '../../components/BigCircularProgress';

const styles = theme => ({
  table: {
    minWidth: 650,
  },
});

function mapStateToProps(state) {
  return {
    data: state.data.items,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
  }
}

class DataTable extends Component {
  render () {
    const { classes, data, loading, error, selectedCountry } = this.props;
    const items = data.filter((d,i) => d.country === selectedCountry);

    if (error) {
      return (
        <div>Sorry, data cannot be loaded properly.</div>
      )
    } else if (loading) {
      return (
        <BigCircularProgress />
      )
    } else {
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="data table">
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell align="right">Day</TableCell>
                <TableCell align="right">Cumulative Confirmed</TableCell>
                <TableCell align="right">Cumulative Deaths</TableCell>
                <TableCell align="right">Cumulative Recovery</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { items.length > 0 &&
                items.map((d,i) => (
                <TableRow key={i}>
                  <TableCell>{d.countryName}</TableCell>
                  <TableCell align="right">{d.day}</TableCell>
                  <TableCell align="right"><NumberFormat value={d.cumConfirmed} displayType={'text'} thousandSeparator={true} /></TableCell>
                  <TableCell align="right"><NumberFormat value={d.cumDeaths} displayType={'text'} thousandSeparator={true} /></TableCell>
                  <TableCell align="right"><NumberFormat value={d.cumRecovery} displayType={'text'} thousandSeparator={true} /></TableCell>
                </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(DataTable));
