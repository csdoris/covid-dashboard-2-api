import { createReducer } from '../reducerUtils';
import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL, CHANGE_COUNTRY, OPEN_DRAWER, CLOSE_DRAWER, SET_TOOLTIP } from './dataConstants';

const initialState = {
  items: [],
  loading: false,
  error: null,
  countries: [],
  worldCumConfirmed: 0,
  worldCumDeaths: 0,
  worldCumRecovery: 0,
  selectedCountry: '',
  drawerOpen: false,
  tooltip: [],
};

const fetchDataBegin = (state) => {
  return {
    ...state,
    loading: true,
    error: null,
  };
}

const fetchDataSuccess = (state, payLoad) => {
  return {
    ...state,
    items: payLoad.items,
    countries: payLoad.countries,
    worldCumConfirmed: payLoad.worldCumConfirmed,
    worldCumDeaths: payLoad.worldCumDeaths,
    worldCumRecovery: payLoad.worldCumRecovery,
    loading: false,
  };
}

const fetchDataFail = (state, payLoad) => {
  return {
    ...state,
    items: [],
    loading: false,
    error: payLoad.error,
  };
}

const changeCountry = (state, payLoad) => {
  return {
    ...state,
    selectedCountry: payLoad.selectedCountry,
  }
}

const openDrawer = (state) => {
  return {
    ...state,
    drawerOpen: true,
  }
}

const closeDrawer = (state) => {
  return {
    ...state,
    drawerOpen: false,
  }
}

const setTooltip = (state, payLoad) => {
  return {
    ...state,
    tooltip: payLoad.tooltip,
  }
}

export default createReducer(initialState, {
  [FETCH_DATA_BEGIN]: fetchDataBegin,
  [FETCH_DATA_SUCCESS]: fetchDataSuccess,
  [FETCH_DATA_FAIL]: fetchDataFail,
  [CHANGE_COUNTRY]: changeCountry,
  [OPEN_DRAWER]: openDrawer,
  [CLOSE_DRAWER]: closeDrawer,
  [SET_TOOLTIP]: setTooltip,
});
