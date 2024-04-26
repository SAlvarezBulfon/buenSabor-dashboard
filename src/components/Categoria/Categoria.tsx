import  { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import SearchBar from '../Common/SearchBar';
import BackendClient from '../../services/BackendClient';
import CategoriaLista from '../Categoria/CategoriaLista';
import ICategoria from '../../types/Categoria';
import { setCategoria } from '../../redux/slices/categoria';

const Categoria = () => {
  const dispatch = useAppDispatch();
  const globalCategorias = useAppSelector((state) => state.categoria.categoria); 

  const [filteredData, setFilteredData] = useState<ICategoria[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasClient = new BackendClient<ICategoria>('http://localhost:3000/categorias');
        const categorias = await categoriasClient.getAll();
        dispatch(setCategoria(categorias));
        setFilteredData(categorias); 
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, [dispatch]);


  const handleSearch = (query: string) => {
    // Filtrar los datos globales según la consulta de búsqueda
    const filtered = globalCategorias.filter((item) =>
      item.denominacion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 4 }}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Categorías
          </Typography>
          <Button
            sx={{
              bgcolor: '#fb6376',
              '&:hover': {
                bgcolor: '#d73754',
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Categoría
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        {/* Renderiza el componente de las categorías */}
        <CategoriaLista categorias={filteredData} />
      </Container>
    </Box>
  );
};

export default Categoria;