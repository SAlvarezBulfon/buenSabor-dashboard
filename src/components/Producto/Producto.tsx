import  { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getArticulosManufacturados } from "../../services/services";
import { setArticuloManufacturado } from "../../redux/slices/articuloManufacturado";
import TableComponent from "../Table/Table";
import SearchBar from "../Common/SearchBar";

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

const Producto = () => {
  const dispatch = useAppDispatch();
  const globalArticulosManufacturados = useAppSelector(
    (state) => state.articuloManufacturado.articuloManufacturado
  );

  const [filteredData, setFilteredData] = useState<Row[]>([]); // Estado para los datos filtrados

  useEffect(() => {
    const fetchArticulosManufacturados = async () => {
      try {
        const articulos = await getArticulosManufacturados();
        dispatch(setArticuloManufacturado(articulos));
        setFilteredData(articulos); // Inicializa los datos filtrados con todos los artículos
      } catch (error) {
        console.error("Error al obtener los artículos manufacturados:", error);
      }
    };

    fetchArticulosManufacturados();
  }, [dispatch]);

  const handleSearch = (query: string) => {
    // Filtrar los datos globales según la consulta de búsqueda
    const filtered = globalArticulosManufacturados.filter((item) =>
      item.denominacion.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns: Column[] = [
    {
      id: "imagen",
      label: "Imagen",
      renderCell: (rowData) => (
        <img
          src={rowData.imagenes.length > 0 ? rowData.imagenes[0].url : ""}
          alt="Imagen"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    { id: "precioVenta", label: "Precio", renderCell: (rowData) => <>{rowData.precioVenta}</> },
    { id: "descripcion", label: "Descripción", renderCell: (rowData) => <>{rowData.descripcion}</> },
    {
      id: "tiempoEstimadoMinutos",
      label: "Tiempo estimado en minutos",
      renderCell: (rowData) => <>{rowData.tiempoEstimadoMinutos}</>,
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 4 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Productos
          </Typography>
          <Button
            sx={{
              bgcolor: "#fb6376",
              "&:hover": {
                bgcolor: "#d73754",
              },
            }}
            variant="contained"
            startIcon={<Add />}
          >
            Producto
          </Button>
        </Box>
        <Box sx={{mt:2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} />
      </Container>
    </Box>
  );
};

export default Producto;
