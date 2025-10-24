import { combineReducers } from "@reduxjs/toolkit"
import bannerReducer from "./slices/bannerSlice"
import categoryReducer from "./slices/category"
import authReducer from './slices/authSlice'
import vendorReducer from './slices/vendorSlice'

const rootReducer = combineReducers({
  banner: bannerReducer,
  category:categoryReducer,
  auth:authReducer,
  vendor:vendorReducer
  
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
