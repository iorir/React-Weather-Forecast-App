import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";
import { UseCity } from "./SelectedCity";
import Cities from "../component/Cities";
import UseGeolocation from "../hooks/UseGeolocation";
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState();
  const [resp, setResp] = useState();
  const [selectedLocation, setSelectedLocation] = useState();
  const { city } = UseCity();
  const location = UseGeolocation();

  useEffect(() => {
    setSelectedLocation(Cities.filter((item) => item.il_adi === city)[0]);
  }, [city]);

  useEffect(() => {
    if (!selectedLocation && location.coordinates) {
      setData({
        latitude: location.coordinates.latitude,
        longitude: location.coordinates.longitude,
      });
    } else if (selectedLocation) {
      setData({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lon,
      });
    }
  }, [city, selectedLocation, location]);

  const pullAPI = () => {
    data.latitude &&
      data.longitude &&
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}&exclude=minutely,hourly&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        )
        .then((res) => setResp(res.data));
  };

  useEffect(() => {
    data && pullAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <DataContext.Provider value={resp}>{children}</DataContext.Provider>;
};

export const UseData = () => useContext(DataContext);
