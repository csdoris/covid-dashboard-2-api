import React, { Component, Fragment } from 'react';

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
          <Grid container spacing={1}>
            <Fragment>
            <Grid container item xs={12} sm={3} spacing={3} direction="column">
              <Grid item><CountryRankTable /></Grid>
              { cards.map((d,i) => 
                <Grid key={i} item><DataCard title={d.title} type={d.type} /></Grid>
              )}
            </Grid>
            </Fragment>
            <Grid container item xs={12} sm={6} spacing={1} direction="column">
              <Grid item xs={12}><ChartCard type={'map'} /></Grid>
            </Grid>
            <Grid container item xs={12} sm={3} spacing={1} direction="column">
              <Grid item xs={12}><ChartCard type={'bar'} /></Grid>
            </Grid>
          </Grid>
        </div>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps)(Dashboard));
