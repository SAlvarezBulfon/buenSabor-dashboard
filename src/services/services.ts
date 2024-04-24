import axios, { AxiosResponse } from 'axios';
import ArticuloManufacturado from '../types/ArticuloManufacturado'; 
import ArticuloInsumo from '../types/ArticuloInsumo';

const url = 'http://localhost:3000';

// Función para obtener los artículos manufacturados
export const getArticulosManufacturados = async (): Promise<ArticuloManufacturado[]> => {
  try {
    const response: AxiosResponse<ArticuloManufacturado[]> = await axios.get<ArticuloManufacturado[]>(`${url}/articulosManufacturados`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los artículos manufacturados:', error);
    throw error;
  }
};

// Función para obtener los artículos insumos
export const getArticulosInsumos = async (): Promise<ArticuloInsumo[]> => {
  try {
    const response: AxiosResponse<ArticuloInsumo[]> = await axios.get<ArticuloInsumo[]>(`${url}/articulosInsumos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los artículos insumos:', error);
    throw error;
  }
};
