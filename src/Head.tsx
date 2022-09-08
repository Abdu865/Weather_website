import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CurrentWeatherLatLon from "./Components/CurrentWeatherLatLon";
import Display24HrForcast from "./Components/Display24HrForcast";
import DailyObject from "./Components/JSONFormat/DailyObject.json";
import Display7DayForcast from "./Components/Display7DayForcast";
import WeeklyObject from "./Components/JSONFormat/WeeklyObject.json";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./Head.css"
import GeoDataFromZip from "./Components/geoDataFromZip";

function Head(API_KEY: string) {
  const [zipcode, setZipcode] = useState('25703')
  const [zipCodeFieldValue, setZipCodeFieldValue] = useState('25703')
  const [timeStamp, setTimeStamp] = useState(Date().toLocaleString())
  const [weatherData, setWeatherData] = useState({
    "lat": 0,
    "lon": 0,
    "hourly": DailyObject,
    "daily": WeeklyObject,
  })
  const [Daily, setDaily] = useState(WeeklyObject)
  const [Hourly, setHourly] = useState(DailyObject)


  const GetData = async (api_key: string, zip: string) => {
    await GeoDataFromZip(api_key, zip)
    .then((data) => { return CurrentWeatherLatLon(api_key, data.lat, data.lon) })
    .then((data) => { setWeatherData(data) })
  }

  useEffect(() => {
    GetData(API_KEY, zipcode)
    setTimeStamp(Date().toLocaleString())
    setDaily(weatherData.daily)
    setHourly(weatherData.hourly)
  }, [zipcode, weatherData]);

  
  return (
    <div className="background">
      <p>24Hour Forcast</p>
        {Display24HrForcast(Hourly)}
      <p>7day Forcast</p>
        {Display7DayForcast(Daily)}
      <div>
        {zipcode}
        {timeStamp}
        <IconButton onClick={() => { GetData(API_KEY, zipcode)}} >
          <RefreshIcon />
        </IconButton>
      </div>
      <TextField className='textbox'
        onChange={(v) => { setZipCodeFieldValue(v.target.value) }} type="text" id="zipcode" />
      <p>
        <Button style={{
          backgroundColor: "white",
          borderRadius: 5,
        }}
        onClick={() => { setZipcode(zipCodeFieldValue) }} variant="outlined">
          Zipcode
        </Button>
      </p>
    </div>
  )
}

export default Head;