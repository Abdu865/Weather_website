import { useState, useEffect } from "react";
import { Card, Tabs, Tab } from "@mui/material";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

function Display24HrForcast(InputData:
  {
    dt: number;
    temp: number;
  }[]) {

  const [Hourly, setHourly] = useState(InputData)

  function date(val: any) {
    var d = new Date(val * 1000);

    return (d.toLocaleString("en-US"));
  }

  function test(data: any) {
    const m = [];

    if (data.length != '48') {
      m.push(<Card sx={{ minWidth: 200, overflowy: "scroll" }}>
      <CardContent>
        <Typography>
          {data[0].temp} °f
          <p>{date(data[0].dt)}</p>
        </Typography></CardContent></Card>);
      return m
    }

    for (var i = 1; i <= 24; i++) {
      m.push(<Card sx={{ minWidth: 200, overflowy: "scroll" }}>
        <CardContent>
          <Typography>
            {data[i].temp} °f
            <p>Weather Status:{data[i].weather[0].main}</p>
            <p>{date(data[i].dt)}</p>
          </Typography></CardContent></Card>);
    }
    return m
  }

  useEffect(() => {
    setHourly(InputData)
  }, [InputData]);

  return (
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
        {test(Hourly).map((prop, i) => (
          <Tab label={prop} value={i} />
        ))}
      </Tabs>
    </div>
  )
}

export default Display24HrForcast;