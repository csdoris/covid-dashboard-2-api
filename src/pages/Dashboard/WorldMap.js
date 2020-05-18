import React, { Component } from 'react';
import * as d3 from 'd3';
import { geoMercator } from 'd3-geo';

import { connect } from 'react-redux';

//import nzGeoData from '../../data/newZealand.geojson';
import worldGeoData from '../../data/world.geojson';

function mapStateToProps(state) {
  return {
    data: state.data.items,
    countries: state.data.countries,
    loading: state.data.loading,
    error: state.data.error,
    selectedCountry: state.data.selectedCountry,
  }
}

class WorldMap extends Component {

  componentDidMount() {
    d3.json(worldGeoData).then(data => this.drawMap(data.features))
    //d3.json(nzGeoData).then(data => this.drawMap(data.features))
  }

  drawMap(data) {
    const { countries } = this.props;

    //const nzCenter = [174.885971,-40.900557];
    const width = 880;
    const height = 500;

    //const projection = geoMercator().center(nzCenter).scale([width*2.2]).translate([width/2,height/2]);
    const projection = geoMercator().center([10,0]).scale(width/2/Math.PI).translate([width/2, height/2]);
    const path = d3.geoPath().projection(projection);

    d3.select("#tooltipCanvas").append("g")
    .attr("id", "tooltip")
    .style("display", "none")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    const svgCanvas = d3.select("#mapCanvas").append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#FFFFFF")
      .style("padding", 0)
      .style("margin-left", 0);

    data.map((d, i) => {
      svgCanvas.append("path")
        .attr("d", path(d))
        .attr("key", "path" + i)
        .attr("fill", "#DDDDDD")
        .style("stroke", "#FFFFFF");
    });

    // Add circles:
    if (countries.length > 0) {
      svgCanvas
        .selectAll("myCircles")
        .data(countries.filter(a => a.x !== ""), d => d.country)
        .enter().append("circle")
          .attr("id", "circleToolTip")
          .attr("cx", d => projection([d.x,d.y])[0])
          .attr("cy", d => projection([d.x,d.y])[1])
          .attr("r", d => Math.log(Math.log(d.cumConfirmed))*Math.log(d.cumConfirmed))
          .style("fill", '#CC3D00')
          .attr("fill-opacity", d => Math.log(d.cumConfirmed)*0.05)
          .attr("stroke", '#FFFFFF')
          .attr("stroke-width", '0.1px')
          .on("mouseover", d => d3.select("#tooltip").style("display", null))
          .on("mousemove", function(d) {
            var xPos = d3.mouse(this)[0] - 15;
            var yPos = d3.mouse(this)[1] - 55;
            d3.select("#tooltip").attr("transform", "translate(" + xPos + "," + yPos + ")");
            d3.select("#tooltip").html(d.countryName);
          })
          .on("mouseleave", d => d3.select("#tooltip").style("display", "none"))
    }
  }

  render() {
    const { countries } = this.props;

    if (countries.length > 0) {
      return (
        <div id="tooltipCanvas"><div id="mapCanvas"></div></div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}
export default connect(mapStateToProps)(WorldMap);