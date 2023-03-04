import { Feature } from "maplibre-gl"
import { LngLatLike, MapboxGeoJSONFeature } from "react-map-gl"
import { Position } from "geojson"


const createPolygon = (features: GeoJSON.Feature[], coor: Position): GeoJSON.Feature[] => {
    const arr = [...features]


    const newFeature: GeoJSON.Feature = {
        id: "barjnfsdlgjkn",
        type: "Feature",
        properties: { color: "red", mode: "none", entity: "polygon" },
        geometry: {
            coordinates: [
                [
                    coor,
                    coor
                ]
            ],
            type: "Polygon"
        }

    }

    arr.push(newFeature)



    return arr
}

const updatePolygon = (fe: any, coor: Position, id: string): GeoJSON.Feature[] => {
    const arr = [...fe]

    const index = arr.findIndex(i => i.id === id)
    const feature = { ...arr[index] };
    const geometry = { ...feature.geometry }

    
    const coordinates = [...geometry.coordinates[0]]
    coordinates.splice(coordinates.length - 1, 0, coor)

    
    geometry.coordinates = [coordinates]
    feature.geometry = geometry

    arr[index] = feature

    return arr
}

export { createPolygon, updatePolygon }