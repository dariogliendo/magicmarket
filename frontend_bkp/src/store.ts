import { ThunkDispatch, configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import cardReducer from "./reducers/cardReducer"
import filterReducer from "./reducers/filterReducer"

const store = configureStore({
  reducer: {
    cardReducer,
    filterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, any>

export const UseAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store