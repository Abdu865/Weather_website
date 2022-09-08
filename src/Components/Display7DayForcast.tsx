import { useState, useEffect } from "react";
import { Card, Tabs, Tab } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function Display7DayForcast(InputData:
  {
    dt: number;
    temp: {
      day: number;
      eve: number;
      max: number;
      min: number;
      morn: number;
      night: number;
    }
  }[]) {

  const [Daily, setDaily] = useState(InputData)

  function date(val: any) {
    var d = new Date(val * 1000);
    var s = d.toLocaleString("en-US")
    s = s.split(', ')[0];
    return (s);
  }

  function test(data: any) {
    const m = [];
    if (data.length != '8') {
      m.push(<Card sx={{ minWidth: 200, overflowy: "scroll" }}>
        <CardContent>
          <Typography>
            {data[0].temp.max} °f
            <p>{date(data[0].dt)}</p>
          </Typography></CardContent></Card>);
      return m
    }

    for (var i = 0; i <= 7; i++) {
      m.push(<Card sx={{ minWidth: 200 }}>
        <CardContent>
          <Typography>
            Day:{data[i].temp.day} °f
            <p>max:{data[i].temp.max}°f  min:{data[i].temp.min}°f</p>
            <p>Weather Status:{data[i].weather[0].main}</p>
            <p>{date(data[i].dt)}</p>
          </Typography></CardContent></Card>);
    }
    return m
  }
  useEffect(() => {
    setDaily(InputData)
  }, [InputData]);

  return (
   
   <body  >
      <div>
        <Tabs
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
            flexDirection: "Row",
            maxWidth: '80%',
            overflow: "hidden",
            display: 'inline-flex',
          }}>
          {test(Daily).map((prop) => (
            <Tab label={prop} />
          ))}
        </Tabs>
      </div>
    </body>
  )
}

export default Display7DayForcast;