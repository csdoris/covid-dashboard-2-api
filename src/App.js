import React, { Component, Fragment } from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { fetchData } from './reducers/dataReducer/dataActions';

import Header from './components/Header';
import DataPage from './pages/DataPage/DataPage';
import Dashboard from './pages/Dashboard/Dashboard';

function mapStateToProps(state) {
  return {
    tooltip: state.data.tooltip,
  }
}

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    return (
      <Fragment>
        <Header />
        <Switch key={this.props.location.key}>
          <Route exact path='/data' component={DataPage} />
          <Route exact path='/' component={Dashboard} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
