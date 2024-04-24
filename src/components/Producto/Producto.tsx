import { Box, Typography } from "@mui/material"
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { getArticulosManufacturados } from "../../services/services";
import ArticuloManufacturado from "../../types/ArticuloManufacturado";
import { setArticuloManufacturado } from "../../redux/slices/articuloManufacturado";

const Producto = () => {
  const dispatch = useAppDispatch();
  const globalArticulosManufacturados = useAppSelector(state => state.articuloManufacturado.articuloManufactuado);

  useEffect(() => {
    const fetchArticulosManufacturados = async () => {
      try {
        const articulos = await getArticulosManufacturados();
        dispatch(setArticuloManufacturado(articulos));
      } catch (error) {
        console.error('Error al obtener los artículos manufacturados:', error);
      }
    };

    fetchArticulosManufacturados();
  }, [dispatch]);

  return (
    <Box component="main" sx={{ flexGrow: 1, pl:9, pt: 4}}>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      {globalArticulosManufacturados.map((articulo: ArticuloManufacturado) => (
        <Box key={articulo.id} sx={{ mt: 2 }}>
          <Typography variant="h6">{articulo.denominacion}</Typography>
          <Typography>{`Precio: ${articulo.precioVenta}`}</Typography>
          <Typography>{`Descripción: ${articulo.descripcion}`}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Producto;
