import Map, { MapRef } from "react-map-gl";
import maplibregl from "maplibre-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useState, useRef } from "react";
import "./App.css";
import EntityLoader from "./EntityLoader";
import LonLatInfo from "./components/LonLatInfo";
import MapEvents from "./map/Events";
import Drawer from "./map/drawer/Drawer";
import Navbar from './components/navbar/Navbar'

function App() {
  const mapRef = useRef<MapRef | null>(null);
  const [viewState, setViewState] = useState({
    longitude: 35,
    latitude: 32,
    zoom: 8,
    pitch: 0,
  });

  return (
    <div className="App">
      <Map
        ref={mapRef}
        mapLib={maplibregl}
        {...viewState}
        localIdeographFontFamily="'Noto Sans', 'Noto Sans CJK SC', sans-serif"
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="http://localhost:3650/api/maps/israel/style.json"
      >
        <EntityLoader />
        <Navbar />
        <Drawer/>
      </Map>
    </div>
  );
}

export default App;
