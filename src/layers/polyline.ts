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
    "line-width": [
      "case",
      ["==", ["feature-state", "selected"], true],
      5,
      ["==", ["feature-state", "hover"], true],
      4,
      3,
    ],
  },
  filter: [
    "all",
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "polyline"],
  ],
};

export { polylineLayer };
