import { useEffect, useState } from 'react';


function GeoDatafromZip(API_KEY: string | undefined, zipcode: string) {

  const [geoData, setgeoData] = useState({
    zip: "90210",
    name: "Beverly Hills",
    lat: 34.0901,
    lon: -118.4065,
    country: "US",
  });

  const loadusingGeoData = () => {
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&limit=1&appid=${API_KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else if (response.status === 404) {
          return Promise.reject('404 error-' + response)
        } else {
          return Promise.reject("other error:" + response.status)
        }
      })
      .then((data) => setgeoData(data))
  };
  useEffect(() => {
    loadusingGeoData()
    
  }, [zipcode]);

  return (geoData)

}

export default GeoDatafromZip;
