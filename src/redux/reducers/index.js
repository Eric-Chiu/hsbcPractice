import { combineReducers } from 'redux'
import { REQUEST_WEATHER, RECEIVE_WEATHER, WEATHER_ERROR } from '../constant'

function weather(
    state = {
      isFetching: false,
      weather: {}
    },
    action
  ) {
    switch (action.type) {
      case REQUEST_WEATHER:
        return Object.assign({}, state, {
          isFetching: true
        })
      case RECEIVE_WEATHER:
        return Object.assign({}, state, {
          isFetching: false,
          weather: action.weatherInfo
        })
      case WEATHER_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          weather: {},
          error: action.error
        })
      default:
        return state
    }
  }

const weatherReducer = combineReducers({
  weather
})

export default weatherReducer