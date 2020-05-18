import React, { Component, Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCountry, openDrawer } from '../reducers/dataReducer/dataActions';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar, Typography, } from '@material-ui/core';
import SideDrawer from './SideDrawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuTitle: {
    color: 'inherit',
    variant: 'inherit',
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
});

function mapStateToProps(state) {
  return {
    data: state.data.items,
    countries: state.data.countries,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCountry, openDrawer }, dispatch);
}

class Header extends Component {
  handleChangeCountry = (country) => {
    this.props.changeCountry(country);
  }

  handleDrawerOpen = () => {
    this.props.openDrawer();
  }

  render() {
    const { classes, countries, selectedCountry } = this.props;
    const thisCountry = (selectedCountry !== '') ? countries.find(e => e.country === selectedCountry) : null;

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h5" className={classes.title} onClick={()=>this.handleChangeCountry('')}><Link to="/" className={classes.menuTitle}>COVID-19 Dashboard</Link></Typography>
            { thisCountry !== null && <Typography variant="h5" className={classes.title}>{thisCountry.countryName}</Typography>}
            <Button className={classes.menuButton} onClick={this.handleDrawerOpen} >Select country for raw data</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <SideDrawer />
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps,mapDispatchToProps)(Header)));
