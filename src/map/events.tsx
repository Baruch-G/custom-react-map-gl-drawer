import { useEffect } from "react";
import { useMap, MapboxGeoJSONFeature, Layer, GeoJSONSource } from "react-map-gl";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import MapSources, { getSource, leyers, sources } from "./sources/source";

const MapEvents = () => {
  const { current: map } = useMap();
  const features = useSelector((state: RootState) => state.entities.features)

  useEffect(() => {
    sources.forEach(src => {
      const source = map?.getSource(src.id) as GeoJSONSource
      if (source) {
        source.setData({
          "type": "FeatureCollection",
          "features": features
        })
      }
    })
  }, [map, features])

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
      map?.querySourceFeatures(src)?.forEach((feature) => {
        setFeatureMode(src, feature.id, { selected: false });
      });
    });
  };

  const setSelectedFeatureMode = (e: any, LayerId: string) => {
    unSelectOtherFeatures();
    if (e.features == null || e.features?.length != 1) return;
    const feature: MapboxGeoJSONFeature = e.features[0];
    setFeatureMode(getSource(LayerId), feature.id, { selected: true });
  };

  leyers().forEach((layer) => {
    map?.on("click", layer.id, (e) => {
      setSelectedFeatureMode(e, layer.id);
    });

    map?.on("click", (e) => {
      if (map.queryRenderedFeatures(e.point).length == 0) unSelectOtherFeatures();
    });
  });

  return <></>;
};
export default MapEvents;
