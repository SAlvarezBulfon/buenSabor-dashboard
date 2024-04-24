import axios, { AxiosResponse } from 'axios';
import ArticuloManufacturado from '../types/ArticuloManufacturado'; 

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
