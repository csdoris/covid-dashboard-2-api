import React, { Component } from 'react';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';


class DataFromAPI extends Component {
  state = {
    data: [],
  }

  componentDidMount() {
    axios.get(`https://corona.lmao.ninja/v2/countries`)
      .then(res => {
        const data = res.data;
        this.setState({data});
      })
  }

  render() {
    const {data} = this.state;
    if (data.length > 0) {
      return (
        <TableContainer component={Paper}>
        <Table aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell>Country Name</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align="right">Cumulative Confirmed</TableCell>
              <TableCell align="right">Cumulative Deaths</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { data.length > 0 &&
              data.map((d,i) => (
              <TableRow key={i}>
                <TableCell>{d.country}</TableCell>
                <TableCell>{d.countryInfo.iso2}</TableCell>
                <TableCell align="right">{d.cases}</TableCell>
                <TableCell align="right">{d.deaths}</TableCell>
              </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}
export default DataFromAPI;