const polygonFillLayer = {
  id: "polygon-layer",
  type: "fill",
  source: "polygon-source",
  paint: {
    "fill-color": [
      "case",
      ["boolean", ["has", "color"], true],
      ["get", "color"],
      "gray",
    ],
    "fill-opacity": [
      "case",
      ["==", ["feature-state", "selected"], true],
      0.7,
      ["==", ["feature-state", "hover"], true],
      0.4,
      0.2,
    ],
  },
  filter: ["==", "$type", "Polygon"] && ["==", ["get", "fill"], true],
};

const polygonOutlineLayer = {
  id: "polygon-outline-layer",
  type: "line",
  source: "polygon-source",
  paint: {
    "line-width": [
      "case",
      ["==", ["feature-state", "selected"], true],
      4,
      ["==", ["feature-state", "hover"], true],
      2,
      1,
    ],
    "line-color": [
      "case",
      ["boolean", ["has", "color"], true],
      ["get", "color"],
      "gray",
    ],
  },
  filter: ["==", "$type", "Polygon"],
};

const polygonLabelLayer = {
  id: "polygon-label-layer",
  type: "symbol",
  source: "polygon-source",
  layout: {
    "text-field": "dfdfs",
    // 'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
    // 'text-radial-offset': 0.5,
    // 'text-justify': 'auto',
    // 'icon-image': ['get', 'icon']
  },
  filter: ["==", "$type", "Polygon"],
};

const fooPolygin = (id: string) => {
  return {
    id: id,
    type: "fill",
    source: "polygon-source",
    paint: {
      "fill-color": [
        "case",
        ["boolean", ["has", "color"], true],
        ["get", "color"],
        "gray",
      ],
      "fill-opacity": [
        "case",
        ["==", ["feature-state", "selected"], true],
        0.7,
        ["==", ["feature-state", "hover"], true],
        0.4,
        0.2,
      ],
    },
    filter: ["==", "$type", "Polygon"],
  };
}

export { polygonFillLayer, polygonOutlineLayer, polygonLabelLayer, fooPolygin };
