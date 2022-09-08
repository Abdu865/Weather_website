const GeoDataFromZip = async (API_KEY: string, zipcode: string) => {
  return await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&limit=1&appid=${API_KEY}`) 
  .then(response => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 404) {
      return Promise.reject('404 error: ' + response)
    } else {
      return Promise.reject("other error: " + response.status)
    }
  })
}

export default GeoDataFromZip;
