const polylineLayer = {
  id: "polyline-layer",
  type: "line",
  source: "polyline-source",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": [
      "case",
      ["boolean", ["has", "color"], true],
      ["get", "color"],
      "green",
    ],
    "line-width": 3,
  },
  filter: [
    "all",
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "polyline"],
  ],
};

const polylineOutlineLayer = {
  id: "polyline-outline-layer",
  type: "line",
  source: "polyline-source",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": ["get", "contractColor"],
    "line-width": ["case", ["==", ["feature-state", "selected"], true], 5, 0],
  },
  filter: [
    "all",
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "polyline"],
  ],
};
export { polylineLayer, polylineOutlineLayer };
