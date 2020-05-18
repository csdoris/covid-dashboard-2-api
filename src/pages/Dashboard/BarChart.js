import React, { Component } from 'react';

import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

import { connect } from 'react-redux';


function mapStateToProps(state) {
  return {
    data: state.data.items,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
  }
}

class BarChart extends Component {
  render() {
    const data = [
      {
        date: "2020-03-01",
        confirmed: 38
      },
      {
        date: "2020-03-02",
        confirmed: 52
      },
      {
        date: "2020-03-03",
        confirmed: 61
      },
      {
        date: "2020-03-04",
        confirmed: 145
      },
      {
        date: "2020-03-05",
        confirmed: 48
      },
      {
        date: "2020-03-06",
        confirmed: 38
      },
      {
        date: "2020-03-07",
        confirmed: 38
      },
      {
        date: "2020-03-08",
        confirmed: 38
      }
    ];
    const cols = {
      confirmed: {
        tickInterval: 10
      }
    };
    return (
      <div>
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="date" />
          <Axis name="confirmed" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="interval" position="date*confirmed" adjust={'stack'} />
        </Chart>
        not real data - yet to complete
      </div>
    );
  }
}

export default connect(mapStateToProps)(BarChart);
