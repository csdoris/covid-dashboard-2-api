import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const defaultSize = 150;

class CircularProgressComponent extends Component {
  render() {
    const { classes, size } = this.props;
    return <CircularProgress {...this.props} classes={classes} size={size} />;
  }
}

class BigCircularProgress extends Component {
  render() {
    const WithStylesComponent = withStyles(theme => ({
      root: {
        top: `calc(50% - ${this.props.size / 2}px)`,
        left: `calc(50% - ${this.props.size / 2}px)`,
        position: 'absolute'
      }
    }))(CircularProgressComponent);
    return <WithStylesComponent {...this.props} />;
  }
}

BigCircularProgress.propTypes = {
  classes: PropTypes.object,
  size: PropTypes.number,
  foreColor: PropTypes.string
};
BigCircularProgress.defaultProps = {
  size: defaultSize,
};

export default BigCircularProgress;
