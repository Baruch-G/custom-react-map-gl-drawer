import { AnyLayer } from "react-map-gl/dist/esm/types";
import { polygonFillLayer, polygonOutlineLayer } from "../../layers/polygon";
import { polylineLayer } from "../../layers/polyline";
import { routeLayer } from "../../layers/route";
import { pointLayer } from "../../layers/point";
import { aircraftLayer } from "../../layers/aircraft";
import { Layer } from "react-map-gl";

enum MapSources {
  POLYGON = "polygon-source",
  POLYLINE = "polyline-source",
  ROUTE = "route-source",
  POINT = "point-source",
  AIRCRAFT = "aircraft-source",
}

export const sources = [
  {
    id: MapSources.POLYGON,
    layers: [polygonFillLayer, polygonOutlineLayer],
  },
  {
    id: MapSources.POLYLINE,
    layers: [polylineLayer],
  },
  {
    id: MapSources.ROUTE,
    layers: [routeLayer],
  },
  {
    id: MapSources.POINT,
    layers: [pointLayer],
  },
  {
    id: MapSources.AIRCRAFT,
    layers: [aircraftLayer],
  },
];

export const leyers = () => {
    let layers: any[] = [];
    sources.forEach((source) => {
      layers.push(...source.layers);
    });
    return layers;
};

const getSource = (LayerId: number | string) => {
    for (let index = 0; index < sources.length; index++) {
        const src = sources[index];
        if(src.layers.some(lar => lar.id === LayerId)) return src.id 
    }

    throw Error(`layer ${LayerId} not found`);
}

export default MapSources;
export { getSource }
