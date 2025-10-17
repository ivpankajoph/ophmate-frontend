import { combineReducers } from "@reduxjs/toolkit"
import bannerReducer from "./slices/bannerSlice"
import categoryReducer from "./slices/category"

const rootReducer = combineReducers({
  banner: bannerReducer,
  category:categoryReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
