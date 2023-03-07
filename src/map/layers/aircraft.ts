const aircraftLayer = {
  id: "aircraft-layer",
  type: "symbol",
  source: "aircraft-source",
  layout: {
    "icon-allow-overlap": true,
    "icon-image": "plane",
    "icon-rotation-alignment": "map",
    "icon-size": 1,
  },

  minzoom: 5,
  filter: [
    "all",
    ["==", "$type", "Point"] && ["==", ["get", "entity"], "aircraft"],
  ],
};

const aircraftLabelLayer = {
  id: "polygon-label-layer",
  type: "symbol",
  source: "aircraft",
  layout: {
    "text-field": "Globus",
    "text-variable-anchor": ["top"],
    "text-radial-offset": 1.5,
    "text-justify": "auto",
    "text-font": [
      "Roboto Regular"
    ],
  },
  minzoom: 9.5,
  paint: {
    "text-color": "white",
    "text-halo-color": "#fff"
  },
  filter: [
    "all",
    ["==", "$type", "Point"] && ["==", ["get", "entity"], "aircraft"],
  ],
};

export { aircraftLayer, aircraftLabelLayer };
