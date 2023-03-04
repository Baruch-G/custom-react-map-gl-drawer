import { FeatureCollection } from "geojson"
import { useEffect, useRef, useState } from "react"
import { MapboxGeoJSONFeature, useMap } from "react-map-gl"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setFeatures } from "../store/geoEntitiesReducer"
import { RootState } from "../store/store"
import { createPolygon, updatePolygon } from "./DrawControl"

interface PinMode {
    action: "create" | "update" | "none",
    entity: "none" | "polygon"
}

const Drawer = () => {
    const [mode, setMode] = useState<
        PinMode>({
            action: "none",
            entity: "none"
        })

    const modeRef = useRef<PinMode>()
    modeRef.current = mode
    const dispatch = useDispatch()

    const entities = useSelector((state: RootState) => state.entities)

    const entitiesRef = useRef<FeatureCollection>();
    entitiesRef.current = entities

    const { current: map } = useMap()
    useEffect(() => {
        map?.on("click", (e) => {
            // debugger
            if (modeRef.current?.action === "create") {
                console.log("creating....")
                dispatch(setFeatures(
                    createPolygon(entitiesRef.current?.features as GeoJSON.Feature[], [e.lngLat.lng, e.lngLat.lat])
                ))

                setMode({ ...modeRef.current, action: "update" })
            }

            else if (modeRef.current?.action === "update") {
                console.log("updating....")

                dispatch(setFeatures(
                    updatePolygon(entitiesRef.current?.features, [e.lngLat.lng, e.lngLat.lat], "barjnfsdlgjkn")
                ))
            }
        })
    }, [])

    return <>
        <button
            style={{ position: "absolute", left: 0, top: 0 }}
            onClick={() => {
                setMode({ ...mode, action: modeRef.current?.action === "create" || modeRef.current?.action === "update" ? "none" : "create" })
            }}
        >
            Create Polygon
        </button></>
}

export default Drawer