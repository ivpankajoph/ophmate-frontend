import { combineReducers } from "@reduxjs/toolkit"
import bannerReducer from "./slices/bannerSlice"
import categoryReducer from "./slices/category"
import authReducer from './slices/authSlice'
import vendorReducer from './slices/vendorSlice'
import productReducer from './slices/productSlice'
import alltemplateReducer from './slices/alltemplateslice'
import vendorprofileReducer from './slices/vendorProfileSlice'

const rootReducer = combineReducers({
  banner: bannerReducer,
  category:categoryReducer,
  auth:authReducer,
  vendor:vendorReducer,
  product:productReducer,
  alltemplatepage:alltemplateReducer,
  vendorprofilepage:vendorprofileReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
