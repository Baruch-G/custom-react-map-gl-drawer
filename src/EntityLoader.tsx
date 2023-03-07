import { useEffect, useState } from "react";
import { useMap } from "react-map-gl";
import aircraft from "./assets/aircraft.svg";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { sources } from "./map/sources/source";
import { AnyLayer } from "react-map-gl/dist/esm/types";
import { GeoJSONSource, Layer } from "mapbox-gl";
import Events from "./map/Events";
const EntityLoader = () => {
  const entities = useSelector((state: RootState) => state.entities).features;
  const { current: map } = useMap();
  const dispatch = useDispatch();

  useEffect(() => {
    let img = new Image(40, 40);
    img.onload = () => map?.addImage("plane", img);
    img.src = aircraft;
  }, []);

  useEffect(() => {
    sources.forEach((src) => {
      const source = map?.getSource(src.id) as GeoJSONSource;
      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: entities,
        });
      }
    });
  }, [map, entities]);

  map?.on("load", (e) => {
    Events(map);
    sources.forEach((source) => {
      e.target.addSource(source.id, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: entities,
        },
      });
      source.layers.forEach((layer) => {
        const newlayer = layer as Layer;
        newlayer.source = source.id;
        e.target.addLayer(newlayer as AnyLayer);
      });
    });
  });

  return <></>;
};

export default EntityLoader;
