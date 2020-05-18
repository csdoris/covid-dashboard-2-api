import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CHANGE_COUNTRY, OPEN_DRAWER, CLOSE_DRAWER, SET_TOOLTIP } from './dataConstants';

import axios from 'axios';

import centroids from '../../data/countries.json';

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (newData) => ({
  type: FETCH_DATA_SUCCESS,
  payLoad: {
    items: newData.data,
    countries: newData.countries,
    worldCumConfirmed: newData.worldCumConfirmed,
    worldCumDeaths: newData.worldCumDeaths,
    worldCumRecovery: newData.worldCumRecovery,
  },
})

export const fetchDataFail = (error) => ({
  type: FETCH_DATA_FAIL,
  payload: {
    error: error,
  },
});

export const fetchData = () => dispatch => {
    dispatch(fetchDataBegin());
    axios.get(`https://corona.lmao.ninja/v2/countries`).then(response => {
      let items = response.data;
      let newData = {
        data: [],
        countries: [],
        worldCumConfirmed: 0,
        worldCumDeaths: 0,
        worldCumRecovery: 0,
      };
      for (let i in items) {
        if (!newData.countries.find(c => c.country === items[i].countryInfo.iso2)) {
          newData.countries.push({
            country: items[i].countryInfo.iso2,
            countryName: items[i].country,
            cumConfirmed: items[i].cases,
            cumDeaths: items[i].deaths,
            cumRecovery: items[i].recovered,
            x: (centroids.filter(a => a.country === items[i].countryInfo.iso2).length > 0) ? centroids.filter(a => a.country === items[i].countryInfo.iso2)[0].longitude : "",
            y: (centroids.filter(a => a.country === items[i].countryInfo.iso2).length > 0) ? centroids.filter(a => a.country === items[i].countryInfo.iso2)[0].latitude : "",
          });
          newData.worldCumConfirmed = (items[i].cases > 0) ? newData.worldCumConfirmed + items[i].cases : newData.worldCumConfirmed;
          newData.worldCumDeaths = (items[i].deaths > 0) ? newData.worldCumDeaths + items[i].deaths : newData.worldCumDeaths;
          newData.worldCumRecovery = (items[i].recovered > 0) ? newData.worldCumRecovery + items[i].recovered : newData.worldCumRecovery;
        }
        const day = new Date(parseInt(items[i].updated))
        newData.data.push({
          id: i,
          country: items[i].countryInfo.iso2,
          countryName: items[i].country,
          day: day.toLocaleDateString(),
          confirmed: items[i].cases,
          cumConfirmed: items[i].cases,
          deaths: items[i].deaths,
          cumDeaths: items[i].deaths,
          recovery: items[i].recovered,
          cumRecovery: items[i].recovered,
        });
      }
      dispatch(fetchDataSuccess(newData));
    }, (error) => {
      dispatch(fetchDataFail(error));
    })
}

export const changeCountry = (country) => ({
  type: CHANGE_COUNTRY,
  payLoad: {
    selectedCountry: country,
  },
})

export const openDrawer = () => ({
  type: OPEN_DRAWER,
})

export const closeDrawer = () => ({
  type: CLOSE_DRAWER,
})

export const setTooltip = (content) => ({
  type: SET_TOOLTIP,
  payLoad: {
    tooltip: content,
  },
})
