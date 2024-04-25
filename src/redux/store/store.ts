import { configureStore } from '@reduxjs/toolkit'
import articuloManufacturadoSlice from '../slices/articuloManufacturado'
import { articuloInsumoSlice } from '../slices/articuloInsumo' 
import { PromocionSlice } from '../slices/Promocion'

export const store = configureStore({
  reducer: {
    articuloManufacturado: articuloManufacturadoSlice,
    articuloInsumo: articuloInsumoSlice.reducer, 
    promocion: PromocionSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
