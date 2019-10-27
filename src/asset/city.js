import cityList from './city.list.json'

const cities = []

cityList.forEach(element => {
    const city = `${element.name.toLowerCase()},${element.country.toLowerCase()}`
    cities.push(city)
});

export default cities