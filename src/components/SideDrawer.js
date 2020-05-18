import React, { Component, Fragment } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCountry, openDrawer, closeDrawer } from '../reducers/dataReducer/dataActions';

import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import NumberFormat from 'react-number-format';

let items = [];

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function mapStateToProps(state) {
  return {
    data: state.data.items,
    countries: state.data.countries,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
    drawerOpen: state.data.drawerOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCountry, openDrawer, closeDrawer }, dispatch);
}

class SideDrawer extends Component {
  handleChangeCountry = (country) => {
    this.props.changeCountry(country);
  }

  toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    open ? this.props.openDrawer() : this.props.closeDrawer();
  }

  render() {
    const { countries, drawerOpen } = this.props;
      if (countries.length > 0) {
        if (items.length === 0) {
          countries.map((d,i) => items.push({
            country: d.country,
            countryName: d.countryName,
            cumConfirmed: d.cumConfirmed,
          }));
        }
        items.sort((a,b) => (b.cumConfirmed - a.cumConfirmed));
        return (
          <div>
            <Fragment key='drawer'>
              <Drawer anchor='right' open={drawerOpen} onClose={this.toggleDrawer(false)} >
                <div role='presentation' onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
                  <List>
                    {items.map((d,i) =>
                      <ListItem button key={d.country} component={Link} to="/data" onClick={()=>this.handleChangeCountry(d.country)}>
                        <ListItemText primary={
                          <Fragment>
                            {d.countryName} – <NumberFormat value={d.cumConfirmed} displayType={'text'} thousandSeparator={true} />
                          </Fragment>
                        } />
                      </ListItem>
                    )}
                  </List>
                </div>
              </Drawer>
            </Fragment>
          </div>
        )
      } else {
        return (
          <div></div>
        )
      }
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(connect(mapStateToProps,mapDispatchToProps)(SideDrawer)));
