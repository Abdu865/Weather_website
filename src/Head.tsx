import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import GeoDatafromZip from "./Components/geoDataFromZip";
import CurrentWeatherLatLon from "./Components/CurrentWeatherLatLon";
import Display24HrForcast from "./Components/Display24HrForcast";
import DailyObject from "./Components/JSONFormat/DailyObject.json";
import Display7DayForcast from "./Components/Display7DayForcast";
import WeeklyObject from "./Components/JSONFormat/WeeklyObject.json";
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import "./Head.css"

function Head(API_KEY: string | undefined) {
  const [zipcode, setZipcode] = useState('25703')
  const [timeStamp, setTimeStamp] = useState(Date().toLocaleString())
  const geoData = GeoDatafromZip(API_KEY, zipcode);
  const WeatherData = CurrentWeatherLatLon(API_KEY, geoData.lat, geoData.lon)
  const [Daily, setDaily] = useState(WeeklyObject)
  const [Hourly, setHourly] = useState(DailyObject)
  const [refreshState, SetrefreshState] = useState(false)

  let state = {
    holdzip: ''
  }

  useEffect(() => {
    SetrefreshState(true)
  })

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.holdzip = (event.target.value);
  };

  useEffect(() => {
    setTimeStamp(Date().toLocaleString())
    setDaily(WeatherData.daily)
    setHourly(WeatherData.hourly)
    SetrefreshState(false)
  }, [zipcode, refreshState]);

  

  return (
    <div className="background">
      <p>24Hour Forcast</p>
      {Display24HrForcast(Hourly)}
      <p>7day Forcast</p>
      {Display7DayForcast(Daily)}
      <div>
        {geoData.zip}
        {timeStamp}
        <IconButton onClick={() => { SetrefreshState(true) }} >
          <RefreshIcon />
        </IconButton>
      </div>
      <TextField className='textbox'
        onChange={handelChange} type="text" id="zipcode" />
      <p>
        <Button style={{

          backgroundColor: "white",
          borderRadius: 5,
        }}
          onClick={(e) => {
            setZipcode(state.holdzip)
          }} variant="outlined">
          Zipcode
        </Button>
      </p>
    </div>)
}

export default Head;