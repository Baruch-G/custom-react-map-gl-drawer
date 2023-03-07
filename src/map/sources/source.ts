import { AnyLayer } from "react-map-gl/dist/esm/types";
import { polygonFillLayer, polygonOutlineLayer, polygonLineLayer } from "../layers/polygon";
import { polylineLayer, polylineOutlineLayer } from "../layers/polyline";
import { routeLayer, routeOutline, routePoints } from "../layers/route";
import { pointLayer } from "../layers/point";
import { aircraftLayer } from "../layers/aircraft";
import { linkedPointLayer } from "../layers/linkedPoint";

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
    layers: [polygonFillLayer, polygonOutlineLayer, polygonLineLayer],
  },
  {
    id: MapSources.POLYLINE,
    layers: [polylineOutlineLayer, polylineLayer],
  },
  {
    id: MapSources.ROUTE,
    layers: [ routeOutline,  routeLayer, routePoints],
  },
  {
    id: MapSources.POINT,
    layers: [pointLayer, linkedPointLayer],
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
