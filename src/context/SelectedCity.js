import { useState, useContext, createContext } from "react";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("");
  const cityData = { city, setCity };
  return (
    <CityContext.Provider value={cityData}>{children}</CityContext.Provider>
  );
};

export const UseCity = () => useContext(CityContext);
