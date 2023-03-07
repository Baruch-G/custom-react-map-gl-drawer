import LonLatInfo from "../LonLatInfo";
import React from "react";
import "./Navbar.css";
import { GeoJSONSource, useMap } from "react-map-gl";
import MapSources from "../../map/sources/source";
import { useDispatch } from "react-redux";
import { stopPinMode } from "../../store/reducers/PinModeReducer";
import { removeEntities } from "../../store/reducers/GeoEntitiesReducer";
const Navbar = () => {
  const { current: currMap } = useMap();
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <LonLatInfo />
      <button
        onClick={() => {
          const geojsonSource = currMap?.getSource(
            MapSources.AIRCRAFT
          ) as GeoJSONSource;
          geojsonSource.setData({
            type: "FeatureCollection",
            features: [],
          });
        }}
      >
        hide planes
      </button>
      <button onClick={() => {
        dispatch(stopPinMode())
        dispatch(removeEntities("linkedPoint"))
      }}>Create</button>
    </div>
  );
};

export default Navbar;
