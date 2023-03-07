import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pinModeActions } from "../../types/Constants";
import { Entity } from "../../types/Entity";
import { PinModeAction } from "../../types/PinModeAction";

interface PinModeProps {
  action: PinModeAction;
  entity: Entity | "none";
}

const initialState: PinModeProps = {
  action: "none",
  entity: "none",
};

export const pinModeSlice = createSlice({
  name: "pinMode",
  initialState,
  reducers: {
    setPinMode: (state, action: PayloadAction<PinModeProps>) => {
      return action.payload;
    },
    setAction: (state, action: PayloadAction<PinModeAction>) => {
      state.action = action.payload;
    },
    startPinMode: (state, action: PayloadAction<Entity>) => {
      (state.action = pinModeActions.CREATE), (state.entity = action.payload);
    },
    stopPinMode: (state) => {
      state.action = pinModeActions.NONE;
    },
  },
});

export const { setPinMode, setAction, startPinMode, stopPinMode } =
  pinModeSlice.actions;
export default pinModeSlice.reducer;
