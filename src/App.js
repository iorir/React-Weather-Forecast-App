import Container from "./component/Container.js";
import "./App.css";
import { DataProvider } from "./context/PullData.js";
import { CityProvider } from "./context/SelectedCity.js";

function App() {
  return (
    <div className="App">
      <CityProvider>
        <DataProvider>
          <Container />
        </DataProvider>
      </CityProvider>
    </div>
  );
}

export default App;
