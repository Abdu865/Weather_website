const CurrentWeatherLatLon = async (API_KEY: string, lat: number, lon: number) => {
  return await fetch(`https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 404) {
      return Promise.reject('404 error: ' + response)
    } else {
      return Promise.reject("other error: " + response.status)
    }
  })
}

export default CurrentWeatherLatLon;