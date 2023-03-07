import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectedEntityParams {
  selected: boolean;
  entity: GeoJSON.Feature;
}

const initialState: selectedEntityParams = {
  selected: false,
  entity: {
    id: 0,
    type: "Feature",
    properties: {},
    geometry: { type: "Point", coordinates: [] },
  },
};

export const selectedEntitySlice = createSlice({
  name: "selectedEntity",
  initialState,
  reducers: {
    selectEntity: (state, action: PayloadAction<GeoJSON.Feature>) => {
      state.selected = true;
      state.entity = action.payload;
    },
    unselect: (state) => {
      state.selected = false;
    },
  },
});

export const { selectEntity, unselect } = selectedEntitySlice.actions;
export default selectedEntitySlice.reducer;
