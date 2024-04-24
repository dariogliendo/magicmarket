import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from 'axios'

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
    nextPage: null,
    page: 1,
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
          status: 'ok',
          page: parseInt(action.payload.page),
          nextPage: action.payload.nextPage
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
      .addCase(getCards.fulfilled, (state, action) => {
        return {
          ...state,
          cards: action.payload.cards,
          page: parseInt(action.payload.page),
          nextPage: action.payload.nextPage,
          status: 'ok'
        }
      })
      .addCase(getCards.rejected, (_, action) => {
        console.log(action.error)
      })
      .addCase(getCards.pending, (state) => {
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

export const getCards = createAsyncThunk('cards/getCards', async (query : AxiosRequestConfig) => {
  const { data } = await axios.get(`http://localhost:3000/cards`, query)
  return data
})