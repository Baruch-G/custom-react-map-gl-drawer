import { useEffect } from "react";
import {
  useMap,
  MapboxGeoJSONFeature,
  Layer,
  GeoJSONSource,
} from "react-map-gl";
import { useSelector } from "react-redux";
import { pinModeActions } from "../types/Constants";
import store, { RootState } from "../store/store";
import { draw } from "./drawer/DrawControl";
import MapSources, { getSource, leyers, sources } from "./sources/source";

const Events = (map: any) => {
  const setFeatureMode = (
    source: string,
    id: string | number | undefined,
    state: { [key: string]: any }
  ) => {
    if (id == undefined) return;
    map?.setFeatureState(
      {
        source: source,
        id: id,
      },
      state
    );
  };

  const unSelectOtherFeatures = () => {
    Object.values(MapSources).forEach((src) => {
      map
        ?.querySourceFeatures(src)
        ?.forEach((feature: MapboxGeoJSONFeature) => {
          setFeatureMode(src, feature.id, { selected: false });
        });
    });
  };

  const setSelectFeature = (e: any) => {
    const bbox = [
      [e.point.x - 5, e.point.y - 5],
      [e.point.x + 5, e.point.y + 5],
    ];

    const selectedFeatures = map.queryRenderedFeatures(bbox, {
      layers: leyers().map((layer) => layer.id),
    });

    if (!selectedFeatures.length) return;

    const selectedFeature = selectedFeatures[0];
    setFeatureMode(getSource(selectedFeature.layer.id), selectedFeature.id, {
      selected: true,
    });
  };


  map.on("mouseenter", "linkedPoint", (e : any) => {
    console.log("mouse enter")
    const canvas = map.getCanvasContainer();

    console.log(e.features[0].id);


    
    // canvas.style.cursor = "move";
  });

  map?.on("click", (e: any) => {
    unSelectOtherFeatures();
    switch (store.getState().pinMode.action) {
      case pinModeActions.CREATE:
      case pinModeActions.UPDATE:
        draw([e.lngLat.lng, e.lngLat.lat]);
        break;
      case pinModeActions.NONE:
        setSelectFeature(e);
        break;
      default:
        throw Error(`unknown mode ${store.getState().pinMode.action}`);
    }
  });
};
export default Events;
