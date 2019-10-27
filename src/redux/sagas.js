import { put, takeLatest, all, call, delay } from 'redux-saga/effects'
import fetch from 'cross-fetch';
import _ from 'lodash';
import { REQUEST_WEATHER } from './constant'
import { receivePosts, weatherError } from './action'
import weatherApiKey from '../key/weatherAPIKey';
import cities from '../asset/city'

function getAvailableCity(city){
  let cityName = city
  if(city){
    const cityFiltered = cities.find(value => value.indexOf(city.toLowerCase()) !== -1)
    if(cityFiltered){
      cityName = cityFiltered
    }
  }
  return cityName
}

function* getCityWeather(action) {
  yield delay(1000)
  const cityName = action.city
  let city = getAvailableCity(cityName)
  if(_.isEmpty(cityName) && _.isEmpty(city)){
    city = 'hong kong,hk'
  }
  const url = `http://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&appid=${weatherApiKey}`
  const response = yield call(fetch, url)
  const weatherInfo = yield call([response, response.json])
  if(weatherInfo.cod === '200'){
    yield put(receivePosts(city, weatherInfo))
  }else{
    yield put(weatherError(city, weatherInfo.message))
  }
  
}

function* watchGetCityWeather() {
  yield takeLatest(REQUEST_WEATHER, getCityWeather)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchGetCityWeather()
  ])
}