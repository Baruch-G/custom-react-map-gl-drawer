const routeLayer = {
  id: "route-layer",
  type: "line",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": [
      "case",
      ["boolean", ["has", "color"], true],
      ["get", "color"],
      "aqua",
    ],
    "line-width": 8,
  },
  filter: [
    "all",
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "route"],
  ],
};

const routeOutline = {
  id: "route-outline-layer",
  type: "line",
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "brown",
    "line-width": ["case", ["==", ["feature-state", "selected"], true], 10, 0],
  },
  filter: [
    "all",
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "route"],
  ],
};

const routePoints = {
  id: "route-point-layer",
  type: "circle",
  source: "point-source",
  paint: {
    "circle-radius": 5,
    "circle-color": "#fff",
    "circle-stroke-color": "#aaa",
    "circle-stroke-width": 1,
  },
  minzoom: 4,
  filter: [
    "all",
    ["==", "$type", "Point"] && ["==", ["get", "entity"], "routePoint"],
  ],
};

export { routeOutline, routeLayer, routePoints };
