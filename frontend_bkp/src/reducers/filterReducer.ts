import { createSlice } from "@reduxjs/toolkit";

export type ColorName = 'W' | 'U' | 'B' | 'R' | 'G' | 'C'
export type ColorFilter = ColorName[]
export type CardFilter = {
  name: string
  colors: ColorFilter
  pageSize: number
  page: number
  sort: string
}

const initialState: CardFilter = {
  name: '',
  colors: [],
  pageSize: 50,
  page: 1,
  sort: 'name',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,
  reducers: {
    textFilter(state, action) {
      return {
        ...state,
        name: action.payload
      }
    },
    setPage(state, action) {
      return {
        ...state,
        page: action.payload
      }
    },
    setPageSize(state, action) {
      return {
        ...state,
        pageSize: action.payload
      }
    },
    setSort: (state, action) => {
      return {
        ...state,
        sort: action.payload
      }
    },
    setFilter(_, action) {
      return {
        ...action.payload
      }
    },
    setColors(state, action) {
      return {
        ...state,
        colors: action.payload
      }
    }
  },
})


export const { textFilter, setPage, setPageSize, setSort, setFilter, setColors } = filterSlice.actions
export default filterSlice.reducer