import React, { Component, Fragment, memo } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCountry, setTooltip } from '../../reducers/dataReducer/dataActions';

import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import NumberFormat from 'react-number-format';

import worldGeoData from '../../data/world-110m.json';

function mapStateToProps(state) {
  return {
    countries: state.data.countries,
    tooltip: state.data.tooltip,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCountry, setTooltip }, dispatch);
}

class SimpleMap extends Component {
  render() {
    const { countries, tooltip } = this.props;

    if (countries.length > 0) {
      const countriesOnMap = countries.filter(a => a.x !== "");
      return (
        <Fragment>
          <ComposableMap
            data-tip=''
            projectionConfig={{ scale: 170 }}
            style={{ width: "100%", backgroundColor: "#FFFFFF" }}>
            <ZoomableGroup zoom={1}>
              <Geographies
                geography={worldGeoData}
                fill='#DDDDDD'
                stroke='#FFFFFF'
                strokeWidth='1'>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography key={geo.rsmKey} geography={geo} />
                  ))
                }
              </Geographies>
              {countriesOnMap.map((d, i) => (
                <Marker key={d.country} coordinates={[d.x, d.y]}>
                  <circle
                    r={Math.log(d.cumConfirmed)}
                    fill='#CC3D00'
                    fillOpacity={Math.log(d.cumConfirmed) * 0.05}
                    stroke='#CC3D00'
                    strokeWidth='1'
                    onClick={(e) => {
                      this.props.changeCountry(d.country);
                    }}
                    onMouseEnter={() => {
                      this.props.setTooltip([d.countryName, d.cumConfirmed]);
                    }}
                    onMouseLeave={() => {
                      this.props.setTooltip(["", ""]);
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
          {tooltip[0] !== "" &&
            tooltip[0] !== undefined &&
            tooltip[0] !== null && (
              <ReactTooltip>
                {tooltip[0]} –{" "}
                <NumberFormat
                  value={tooltip[1]}
                  displayType={"text"}
                  thousandSeparator={true}
                />
              </ReactTooltip>
            )}
        </Fragment>
      );
    } else {
     return (
       <div></div>
     ) 
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(memo(SimpleMap));
