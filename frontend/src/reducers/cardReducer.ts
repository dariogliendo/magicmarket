import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IScryfallCard, IScryfallError, IScryfallList } from "scryfall-types-alt";

interface CardReducerState {
  cards: IScryfallCard[],
  status: string
}

const initialState : CardReducerState = {
  cards: [],
  status: 'ok'
}

const cardSlice = createSlice({
  name: 'cards',
  initialState,
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
      .addCase(searchCards.fulfilled, (state, action) => {
        return {
          ...state,
          cards: action.payload.data,
          status: 'ok'
        }
      })
      .addCase(searchCards.rejected, (_, action) => {
        if (action.error) console.log(action.error)
      })
      .addCase(searchCards.pending, (state) => {
        return {
          ...state,
          status: 'loading'
        }
      })
  }
})


export const { setCards } = cardSlice.actions
export default cardSlice.reducer

export const searchCards = createAsyncThunk('cards/searchCards' , async (query : AxiosRequestConfig) : Promise<IScryfallList<IScryfallCard>> => {
  try {
    const { data } : AxiosResponse = await axios.get('https://api.scryfall.com/cards/search', query)
    return data
  } catch (error) {
    if ((error as AxiosError<IScryfallError>).response?.status === 404) {
      return {
        object: 'list',
        data: [],
        has_more: false
      }
    }
    else throw error
  }
})