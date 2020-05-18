import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import BarChart from './BarChart';
import SimpleMap from './SimpleMap';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ChartCard extends Component {
  render() {
    const { classes, type } = this.props;

    return (
      <Paper className={classes.paper}>
        { type === 'bar' ? <BarChart /> : <SimpleMap /> }
      </Paper>
    )
  }
}

export default withStyles(styles, { withTheme: true })(ChartCard);