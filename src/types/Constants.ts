import { PinModeAction } from "./PinModeAction";

interface pinModeActionsType {
  CREATE: "create";
  UPDATE: "update";
  NONE: "none";
}

export const pinModeActions: Readonly<pinModeActionsType> = {
  CREATE: "create",
  UPDATE: "update",
  NONE: "none",
};

