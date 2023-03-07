import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GeoJSONSource, MapboxGeoJSONFeature } from "react-map-gl";
import demoEntities from "../../DemoEntities.json";
import {
  FeatureCollection,
  GeoJsonObject,
  GeoJsonProperties,
  GeoJsonTypes,
} from "geojson";
import { entity } from "../../map/feature/DeaultFeature";
import { Polygon, LineString, Position } from "geojson";
import { gg } from "../../map/types/color";
const initialState = demoEntities as FeatureCollection;

({ ...initialState }.features
  .filter((feature) => feature.properties?.entity === "route")
  .forEach((fe) => {
    if (fe.geometry.type === "LineString") {
      fe.geometry.coordinates.forEach((i) => {
        initialState.features.push({
          id: Math.round(Math.random() * 1000000),
          type: "Feature",
          properties: { entity: "routePoint" },
          geometry: {
            coordinates: i,
            type: "Point",
          },
        });
      });
    }
  }));

initialState.features.forEach((feature) => {
  if (feature.properties?.color) {
    feature.properties = {
      ...feature.properties,
      contractColor: gg(feature.properties?.color),
    };
  }
});

export interface newEntityProps {
  defaultFeature: GeoJSON.Feature;
  defaultLinkedPointFeature?: GeoJSON.Feature;
}

export interface insertCoordinateProps {
  id: number;
  coordinate: Position;
  defaultLinkedPointFeature?: GeoJSON.Feature;
}

type Geometry = LineString | Polygon;
export const geoEntitiesSlice = createSlice({
  name: "geoEntities",
  initialState,
  reducers: {
    setFeatures: (state, action: PayloadAction<GeoJSON.Feature[]>) => {
      state.features = action.payload;
    },
    addEntity: (state, action: PayloadAction<newEntityProps>) => {
      const arr = [...state.features];
      const newFeature = action.payload.defaultFeature;

      arr.push(newFeature);

      if (action.payload.defaultLinkedPointFeature !== undefined) {
        arr.push(action.payload.defaultLinkedPointFeature);
      }

      state.features = arr;
    },
    removeEntities: (state, action: PayloadAction<entity>) => {
      const arr = [...state.features];
      const newArr = arr.filter(
        (feature) => feature.properties?.entity !== action.payload
      );
      state.features = newArr;
    },
    insertCoordinate: (state, action: PayloadAction<insertCoordinateProps>) => {
      const arr = [...state.features];

      const index = arr.findIndex((i) => i.id === action.payload.id);
      const feature = { ...arr[index] };
      const geometry = { ...(feature.geometry as Geometry) };

      if (feature.geometry.type === "Polygon") {
        const coordinates: Position[] = [
          ...(geometry.coordinates[0] as Position[]),
        ];
        coordinates.splice(
          coordinates.length - 1,
          0,
          action.payload.coordinate
        );

        geometry.coordinates = [coordinates];
      }
      console.log(feature.geometry.type);
      if (feature.geometry.type === "LineString") {
        console.log("line");
        const coordinates: Position[] = [
          ...(geometry.coordinates as Position[]),
        ];
        coordinates.push(action.payload.coordinate);
        geometry.coordinates = coordinates;
      }

      feature.geometry = geometry;

      arr[index] = feature;

      if (action.payload.defaultLinkedPointFeature !== undefined) {
        arr.push(action.payload.defaultLinkedPointFeature);
      }

      state.features = arr;
    },
  },
});

export const { setFeatures, addEntity, insertCoordinate, removeEntities } =
  geoEntitiesSlice.actions;
export default geoEntitiesSlice.reducer;
