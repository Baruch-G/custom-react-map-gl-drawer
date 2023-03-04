import { configureStore } from '@reduxjs/toolkit'
import geoEntitiesReducer from "./geoEntitiesReducer"
const store = configureStore({
    reducer: {
      entities: geoEntitiesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export default store;