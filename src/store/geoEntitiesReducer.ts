import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoJSONSource } from "react-map-gl";
import demoEntities from '../DemoEntities.json'
import { FeatureCollection, GeoJsonObject, GeoJsonProperties, GeoJsonTypes, Geometry } from "geojson";
import mapboxgl from "mapbox-gl";



const initialState = demoEntities as FeatureCollection;

export const geoEntitiesSlice = createSlice({
  name: "geoEntities",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<GeoJSON.Feature[]>) => {
      state.features = action.payload;
    }
  },
});

export const { setFeatures } = geoEntitiesSlice.actions;
export default geoEntitiesSlice.reducer;