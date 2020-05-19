import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import BigCircularProgress from '../../components/BigCircularProgress';
import CountryRankTable from './CountryRankTable';
import DataCard from '../DataPage/DataCard';
import ChartCard from './ChartCard';

const cards = [
  {
    title: 'Total number of cases',
    type: 'cumConfirmed',
  },
  {
    title: 'Total number of deaths',
    type: 'cumDeaths',
  },
  {
    title: 'Total number of recovery',
    type: 'cumRecovery',
  },
];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

function mapStateToProps(state) {
  return {
    loading: state.data.loading,
    error: state.data.error,
  }
}

class Dashboard extends Component {
  render() {
    const { classes, error, loading, histError, histLoading } = this.props;

    if (error || histError) {
      return (
        <div>Sorry, data cannot be loaded properly.</div>
      )
    } else if (loading || histLoading) {
      return (
        <BigCircularProgress />
      )
    } else {
      return (
        <div className={classes.root}>
          <Grid container spacing={1}>
            { cards.map((d,i) => (
              <Grid item xs={12} sm={3} key={i}><DataCard title={d.title} type={d.type} /></Grid>
            ))}
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={2}><CountryRankTable /></Grid>
            <Grid item xs={12} sm={5}><ChartCard type={'map'} /></Grid>
            <Grid item xs={12} sm={5}><ChartCard type={'line'} /></Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Dashboard));
