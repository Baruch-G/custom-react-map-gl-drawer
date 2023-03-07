const linkedPointLayer = {
    id: "linked-point-layer",
    type: "circle",
    source: "point-source",
    paint: {
      "circle-radius": 4,
      "circle-color": "white",
      "circle-stroke-width" : 2,
      "circle-stroke-color" : "gray"
    },
    filter: [
      "all",
      ["==", "$type", "Point"] && ["==", ["get", "entity"], "linkedPoint"],
    ],
}

export { linkedPointLayer}