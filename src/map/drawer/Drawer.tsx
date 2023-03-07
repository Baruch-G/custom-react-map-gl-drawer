import { FeatureCollection } from "geojson";
import { useEffect, useRef, useState } from "react";
import { MapboxGeoJSONFeature, useMap } from "react-map-gl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAction, setPinMode, startPinMode } from "../../store/reducers/PinModeReducer";
import { pinModeActions } from "../../types/Constants";
import { setFeatures } from "../../store/reducers/GeoEntitiesReducer";
import store, { RootState } from "../../store/store";
import { createPolygon, draw, updatePolygon } from "./DrawControl";

const Drawer = () => {
  const entities = useSelector((state: RootState) => state.entities);
  const entitiesRef = useRef<FeatureCollection>();
  entitiesRef.current = entities;

  return (
    <>
      <button
        style={{ position: "absolute", left: 0, top: 0 }}
        onClick={() => {
          store.dispatch(
            startPinMode("polygon")
          );
        }}
      >
        Create Polygon
      </button>
      <button
        style={{ position: "absolute", left: 0, top: 30 }}
        onClick={() => {
          store.dispatch(
            startPinMode("polyline")
          );
        }}
      >
        Create Polyline
      </button>
    </>
  );
};

export default Drawer;
