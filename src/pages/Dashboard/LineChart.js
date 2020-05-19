import React, { Component } from 'react';

import { connect } from 'react-redux';

import Plot from 'react-plotly.js';

function mapStateToProps(state) {
  return {
    histData: state.data.histData,
    histWorldData: state.data.histWorldData,
    histLoading: state.data.histLoading,
    histError: state.data.histError,
    countries: state.data.countries,
    selectedCountry: state.data.selectedCountry,
  }
}

class LineChart extends Component {
  render() {
    const { histData, histWorldData, histError, histLoading, countries, selectedCountry } = this.props;
    
    if (histError) {
      return (
        <div>Sorry, historical data is temporarily unavailable. Please try again later.</div>
      )
    } else if (histLoading) {
      return (
        <div>Loading data...</div>
      )
    } else if (histData.length <= 0) {
      if (selectedCountry==='') {
        return (
          <div>Sorry, historical data is temporarily unavailable. Please try again later.</div>
        )
      } else {
        return (
        <div>Sorry, historical data for {countries.filter(a => a.country === selectedCountry)[0]['countryName']} is not available.</div>
        )
      }
    } else {
      var xConfirmed = [];
      var yConfirmed = [];
      var xDeaths = [];
      var yDeaths = [];
      var xRecovery = [];
      var yRecovery = [];

      if (selectedCountry === '') {
        for (let i in histWorldData.cases) {
          xConfirmed.push(histWorldData.cases[i].day);
          yConfirmed.push(histWorldData.cases[i].cases);
        }
        for (let i in histWorldData.deaths) {
          xDeaths.push(histWorldData.deaths[i].day);
          yDeaths.push(histWorldData.deaths[i].deaths);
        }
        for (let i in histWorldData.recovered) {
          xRecovery.push(histWorldData.recovered[i].day);
          yRecovery.push(histWorldData.recovered[i].recovered);
        }

        return (
          <Plot
            data={[
              {
                x: xConfirmed,
                y: yConfirmed,
                name: 'Cases',
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#FACD3D' },
              },
              {
                x: xDeaths,
                y: yDeaths,
                name: 'Deaths',
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#2CCCC3' },
              },
              {
                x: xRecovery,
                y: yRecovery,
                name: 'Recovery',
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: '#5626C4' },
              },
            ]}
            layout={{ width: 700, height: 440 }}
          />
        )
      } else {
        const name = countries.filter(a => a.country === selectedCountry)[0]['countryName'];
        const countryCases = histData.cases.filter(a => a.countryName === name);
        const countryDeaths = histData.deaths.filter(a => a.countryName === name);
        const countryRecovered = histData.recovered.filter(a => a.countryName === name);

        if (countryCases.length > 0) {
          for (let i in countryCases) {
            xConfirmed.push(countryCases[i].day);
            yConfirmed.push(countryCases[i].cases);
          }
        }
        if (countryDeaths.length > 0) {
          for (let i in countryDeaths) {
            xDeaths.push(countryDeaths[i].day);
            yDeaths.push(countryDeaths[i].deaths);
          }
        }
        if (countryRecovered.length > 0) {
          for (let i in countryRecovered) {
            xRecovery.push(countryRecovered[i].day);
            yRecovery.push(countryRecovered[i].recovered);
          }
        }
        if (countryCases.length > 0) {
          return (
            <Plot
              data={[
                {
                  x: xConfirmed,
                  y: yConfirmed,
                  name: 'Cases',
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: '#FACD3D' },
                },
                {
                  x: xDeaths,
                  y: yDeaths,
                  name: 'Deaths',
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: '#2CCCC3' },
                },
                {
                  x: xRecovery,
                  y: yRecovery,
                  name: 'Recovery',
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: '#5626C4' },
                },
              ]}
              layout={{ width: 700, height: 440 }}
            />
          )
        } else {
          return (
          <div>Sorry, historical data for {countries.filter(a => a.country === selectedCountry)[0]['countryName']} is not available.</div>
          )
        }
      }
    }
  }
}

export default connect(mapStateToProps)(LineChart);
