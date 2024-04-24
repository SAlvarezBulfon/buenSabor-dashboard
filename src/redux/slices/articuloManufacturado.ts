import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import ArticuloManufacturado from '../../types/ArticuloManufacturado'

interface IInitialState {
  articuloManufactuado: ArticuloManufacturado [];
}


const initialState:  IInitialState = {
  articuloManufactuado: [],
}

export const articuloManufacturadoSlice = createSlice({
  name: 'articuloManufacturadoState',
  initialState,
  reducers: {
    setArticuloManufacturado: (state, action: PayloadAction<ArticuloManufacturado[]>) => {
      state.articuloManufactuado = action.payload;
    },
    resetArticuloManufacturado: (state) => {
      state.articuloManufactuado  = [];
    }
  },
})

export const { setArticuloManufacturado, resetArticuloManufacturado } = articuloManufacturadoSlice.actions

export default articuloManufacturadoSlice.reducer