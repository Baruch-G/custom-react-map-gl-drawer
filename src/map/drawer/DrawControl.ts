import { ColorMode, Feature } from "maplibre-gl";
import { LngLatLike, MapboxGeoJSONFeature } from "react-map-gl";
import { Position } from "geojson";
import { defaultFeature, entity } from "../../map/feature/DeaultFeature";
import store from "../../store/store";
import { setAction, setPinMode } from "../../store/reducers/PinModeReducer";
import {
  addEntity,
  insertCoordinate,
  insertCoordinateProps,
  newEntityProps,
} from "../../store/reducers/GeoEntitiesReducer";
import { selectEntity } from "../../store/reducers/SelectedEntityReducer";
import { pinModeActions } from "../../types/Constants";

const draw = (coordinate: Position) => {
  const entity = store.getState().pinMode.entity as entity;
  switch (store.getState().pinMode.action) {
    case pinModeActions.CREATE:
      const payload: newEntityProps = {
        defaultFeature: defaultFeature(entity, coordinate),
        defaultLinkedPointFeature : defaultFeature("linkedPoint", coordinate)
      };

      store.dispatch(addEntity(payload));
      store.dispatch(setAction(pinModeActions.UPDATE));
      store.dispatch(selectEntity(payload.defaultFeature));
      break;
    case pinModeActions.UPDATE:
      const insertCoordinatePayload: insertCoordinateProps = {
        coordinate: coordinate,
        id: store.getState().selectedEntity.entity.id as number,
        defaultLinkedPointFeature : defaultFeature("linkedPoint", coordinate)
      };

      store.dispatch(insertCoordinate(insertCoordinatePayload));
      break;

    default:
      throw Error(`can not draw ent with ${store.getState().pinMode.action} mode`)
  }
};

const createPolygon = (
  features: GeoJSON.Feature[],
  coor: Position
): GeoJSON.Feature[] => {
  const arr = [...features];
  const newFeature = defaultFeature(store.getState().pinMode.entity, coor);
  arr.push(newFeature);
  store.dispatch(setAction("update"));
  return arr;
};

const updatePolygon = (
  fe: any,
  coor: Position,
  id: string
): GeoJSON.Feature[] => {
  const arr = [...fe];

  const index = arr.findIndex((i) => i.id === id);
  const feature = { ...arr[index] };
  const geometry = { ...feature.geometry };

  const coordinates = [...geometry.coordinates[0]];
  coordinates.splice(coordinates.length - 1, 0, coor);

  geometry.coordinates = [coordinates];
  feature.geometry = geometry;

  arr[index] = feature;

  return arr;
};

export { createPolygon, updatePolygon, draw };
