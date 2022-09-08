import  { useEffect, useState } from 'react';


function CurrentWeatherLatLon(API_KEY: string | undefined, lat: number,lon: number) {

 const [weather, setWeather] = useState({
 lat:0,
 lon:0,
 hourly: [
  {
    dt:0,
    temp:0,
    
  }
 ],
 daily: [
  {
    dt:0,
    temp: {
      day: 0,
      eve: 0,
      max: 0,
      min: 0,
      morn: 0,
      night: 0
    }
  }
 ]
 });
 
 
  function weatherFromlatLon() {
    fetch(`https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`)
     .then((response) => response.json())
     .then((data) => setWeather(data))
   }
   
   useEffect(() => {
    weatherFromlatLon()
  },[lat, lon]);

return(weather)
}

export default CurrentWeatherLatLon;