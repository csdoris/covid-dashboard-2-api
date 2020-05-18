import { combineReducers } from 'redux';
import dataReducer from './dataReducer/dataReducer';

const rootReducer = combineReducers ({
  data: dataReducer,
})

export default rootReducer;
