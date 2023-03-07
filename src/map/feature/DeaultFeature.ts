import { MapboxGeoJSONFeature } from "react-map-gl";
import { Position, Geometry } from "geojson";
export type entity = "polygon" | "polyline" | "route" | "linkedPoint" | "point";

const defaultFeature  = (
  entity: entity,
  coordinate: Position
): GeoJSON.Feature => {
  return {
    id: Math.round(Math.random()*1000000),
    type: "Feature",
    properties: defaultProperties[entity],
    geometry: defaultGeometry(entity, coordinate),
  };
};

const defaultProperties = {
  polygon: {
    entity : "polygon",
    name: "POLYGON_001",
    color: "red",
  },
  polyline: {
    entity : "polyline",
    name: "POLYLINE_001",
    color: "black",
  },
  route: {
    entity : "route",
    name: "ROUTE_001",
    color: "green",
  },
  linkedPoint : {
    entity: "linkedPoint",
    name: 'LINKE_POINT_001',
    color : "red"
  },
  point : {
    entity: "point",
    name: 'POINT_001',
    color : "red"
  }
};

const defaultGeometry = (entity: entity, coordinate: Position): Geometry => {
  switch (entity) {
    case "polygon":
      return {
        type: "Polygon",
        coordinates: [[coordinate, coordinate]],
      };
    case "polyline":
    case "route":
      return {
        type: "LineString",
        coordinates: [coordinate],
      };

      case "point":
      case "linkedPoint":

        return {
          type: "Point",
          coordinates: coordinate,
        };
    default:
      throw Error("No such entity " + entity);
  }
};
export { defaultFeature };
