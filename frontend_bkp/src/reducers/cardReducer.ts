import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import type { RootState } from "../store";

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    nextPage: null,
    status: 'loading',
  },
  reducers: {
    setCards: (state, action) => {
      return {
        ...state,
        cards: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(initializeCards.fulfilled, (state, action) => {
        return {
          ...state,
          cards: action.payload.cards,
          status: 'ok'
        }
      })
      .addCase(initializeCards.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(initializeCards.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        }
      })
      .addCase(applyFilter.fulfilled, (state, action) => {
        return {
          ...state,
          cards: action.payload.cards,
          status: 'ok'
        }
      })
      .addCase(applyFilter.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(applyFilter.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        }
      })
  }
})


export const { setCards } = cardSlice.actions
export default cardSlice.reducer

export const initializeCards = createAsyncThunk('cards/updateCards', async () => {
  const { data } = await axios.get(`http://localhost:3000/cards`)
  return data
})

export const applyFilter = createAsyncThunk<any, void, {state: RootState}>('cards/getCards', async (_, { getState }) => {
  const { filterReducer } = getState()
  const { data } = await axios.get('http://localhost:3000/cards', {
    params: filterReducer
  })
  return data
})