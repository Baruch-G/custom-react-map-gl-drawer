const routeLayer = {
    id: "route-layer",
    type: "line",
    source: "route-source",
    layout: {
        'line-cap': 'round',
        'line-join': 'round'
    },
    paint: {
      "line-color":  [
        'case',
        ['boolean', ['has', "color"], true], 
        ['get', "color"],
        "black"
      ],
      "line-width": 6
    },
    filter: ["all", 
    ["==", "$type", "LineString"] && ["==", ["get", "entity"], "route"]],
  };

  export {routeLayer}