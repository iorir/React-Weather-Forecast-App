import React from "react";
import { UseData } from "../context/PullData";
import Cities from "./Cities.json";
import { UseCity } from "../context/SelectedCity";
import { Grid, MenuItem, TextField, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

function Container() {
  const data = UseData();
  const { setCity } = UseCity();
  const getDayMonth = (dt) => {
    let unix_timestamp = dt;
    var date = new Date(unix_timestamp * 1000);
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;

    return `${day}/${month}`;
  };
  const getDate = (dt) => {
    let unix_timestamp = dt;
    var date = new Date(unix_timestamp * 1000);
    var dayName = date.toString().split(" ")[0];

    return `${dayName}`;
  };
  return (
    <div className="container">
      <TextField
        select
        fullWidth
        label="City"
        id="demo-simple-select"
        onChange={(e) => setCity(e.target.value)}
      >
        {Cities.map((item) => {
          return (
            <MenuItem key={item.plaka} value={item.il_adi}>
              {item.il_adi}
            </MenuItem>
          );
        })}
      </TextField>
      <Grid
        container
        marginTop={5}
        columnGap={6}
        direction={"row"}
        justifyContent="center"
      >
        {data &&
          data.daily.map((item, index) => {
            return (
              <Grid
                item
                key={index}
                xs={9}
                sm={5}
                md={4}
                lg={3}
                xl={2}
                textAlign="center"
                marginBottom={5}
              >
                <Card
                  sx={{
                    bgcolor: "primary.main",
                    borderRadius: 5,
                    paddingTop: 3,
                    paddingBottom: 3,
                    color: "white",
                    ...(index === 0 && {
                      border: "1px solid",
                    }),
                  }}
                >
                  <CardActionArea
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5" component="span">
                      {getDayMonth(item.dt)} <br /> {getDate(item.dt)}
                    </Typography>
                    <CardMedia
                      component="img"
                      style={{
                        width: "100px",
                      }}
                      height="140"
                      image={require(`../assets/${item.weather[0].icon}.png`)}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="span">
                        Max: {item.temp.max}
                      </Typography>
                      <br />
                      <Typography gutterBottom variant="h5" component="span">
                        Min: {item.temp.min}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default Container;
