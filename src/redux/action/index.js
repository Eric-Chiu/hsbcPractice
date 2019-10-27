import {REQUEST_WEATHER, RECEIVE_WEATHER, WEATHER_ERROR} from '../constant'

export function getCityWeather(cityName) {
  return {
    type: REQUEST_WEATHER,
    city: cityName
  }
}

export function receivePosts(city, weatherInfo) {
  return {
    type: RECEIVE_WEATHER,
    city,
    weatherInfo,
    receivedAt: Date.now()
  }
}


export function weatherError(city, error) {
  return {
    type: WEATHER_ERROR,
    city,
    error
  }
}