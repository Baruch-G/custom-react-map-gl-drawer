import { useEffect, useState } from "react";
import {
  useMap,
  Source,
  Layer,
  MapboxGeoJSONFeature,
  GeoJSONSource,
} from "react-map-gl";
import {
  polygonFillLayer,
  polygonOutlineLayer,
  polygonLabelLayer,
  fooPolygin,
} from "./layers/polygon";
import { pointLayer } from "./layers/point";
import { aircraftLabelLayer, aircraftLayer } from "./layers/aircraft";
import aircraft from "./assets/aircraft.svg";
import { polylineLayer } from "./layers/polyline";
import { routeLayer } from "./layers/route";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { setFeatures } from "./store/geoEntitiesReducer";
import MapSources, { sources } from "./map/sources/source";
import { AnyLayer } from "react-map-gl/dist/esm/types";


const EntityLoader = () => {
  const featureCollection = useSelector((state: RootState) => state);
  const { current: currMap } = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    let img = new Image(40, 40);
    img.onload = () => currMap?.addImage("plane", img);
    img.src = aircraft;
  }, []);

  currMap?.on("load", (e) => {
    sources.forEach((source) => {
      e.target.addSource(source.id, {
        type: "geojson",
        data: featureCollection.entities,
        generateId: true,
      });
      source.layers.forEach((layer) => {
        e.target.addLayer(layer as AnyLayer)
      });
    });

    // e.target.addLayer(polygonFillLayer as AnyLayer)
    // e.target.addLayer(polygonOutlineLayer as AnyLayer)

   

    // e.target.addLayer(polylineLayer as AnyLayer)

    // e.target.addLayer(routeLayer as AnyLayer)

    // e.target.addLayer(pointLayer as AnyLayer)

    // e.target.addLayer(aircraftLayer as AnyLayer)
  });

  return <></>;
};

export default EntityLoader;
