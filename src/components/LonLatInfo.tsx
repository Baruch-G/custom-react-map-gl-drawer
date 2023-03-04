import { GeoJSONSource, useMap } from "react-map-gl";
import "./LonLatInfo.css";
import MapSources from "../map/sources/source";
import { useState, useEffect } from "react"

const LonLatInfo = () => {
  const { current: currMap } = useMap();
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    currMap?.on("mousemove", (e) => {
      setMousePosition({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    });
  }, []);

  return (
    <div className="position-info">
      <p>
        {`${mousePosition.lng.toFixed(5)},
            ${mousePosition.lat.toFixed(5)}`}
      </p>
      <p>{currMap?.getZoom()}</p>

      <button onClick={() => {
        const geojsonSource = currMap?.getSource(MapSources.AIRCRAFT) as GeoJSONSource;
        geojsonSource.setData({
          "type": "FeatureCollection",
          "features": []
        });
      }}>hide planes</button>
    </div>
  );
};

export default LonLatInfo;
