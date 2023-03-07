import { configureStore } from '@reduxjs/toolkit'
import geoEntitiesReducer from "./reducers/GeoEntitiesReducer"
import pinModeReducer from "./reducers/PinModeReducer"
import selectedEntityReducer from "./reducers/SelectedEntityReducer"

const store = configureStore({
    reducer: {
      entities: geoEntitiesReducer,
      pinMode : pinModeReducer,
      selectedEntity : selectedEntityReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store;