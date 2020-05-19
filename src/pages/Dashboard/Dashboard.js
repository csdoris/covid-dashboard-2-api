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
    const { classes, error, loading } = this.props;

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
        <div className={classes.root}>
          <Grid container spacing={3}>
            { cards.map((d,i) => (
              <Grid item xs={12} sm={3} key={i}><DataCard title={d.title} type={d.type} /></Grid>
            ))}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}><CountryRankTable /></Grid>
            <Grid item xs={12} sm={6}><ChartCard type={'map'} /></Grid>
            <Grid item xs={12} sm={3}><ChartCard type={'bar'} /></Grid>
            <Grid item xs={12} sm={3}><ChartCard type={'bar'} /></Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Dashboard));
