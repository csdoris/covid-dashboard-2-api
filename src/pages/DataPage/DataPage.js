import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import DataCard from './DataCard';
import DataTable from './DataTable';

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

class DataPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center">
          { cards.map((d,i) => 
            <Grid key={i} item xs={3}><DataCard title={d.title} type={d.type} /></Grid>
          )}
          <Grid item xs={10}><DataTable /></Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(DataPage);
