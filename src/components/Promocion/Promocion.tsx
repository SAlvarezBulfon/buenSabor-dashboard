import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPromociones } from "../../services/services";
import { setPromocion } from "../../redux/slices/Promocion";
import TableComponent from "../Table/Table";
import SearchBar from "../Common/SearchBar";
import PromocionType from "../../types/Promocion";

interface Row {
  [key: string]: any;
}

interface Column {
  id: keyof Row;
  label: string;
  renderCell: (rowData: Row) => JSX.Element;
}

const Promocion: React.FC = () => {
  const dispatch = useAppDispatch();
  const globalPromociones = useAppSelector(
    (state) => state.promocion.promocion
  );

  const [filteredData, setFilteredData] = useState<PromocionType[]>([]);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        const promociones = await getPromociones();
        dispatch(setPromocion(promociones));
        setFilteredData(promociones);
      } catch (error) {
        console.error("Error al obtener las promociones:", error);
      }
    };

    fetchPromociones();
  }, [dispatch]);

  const handleSearch = (query: string) => {
    const filtered = globalPromociones.filter((promocion: PromocionType) =>
      promocion.denominacion.toLowerCase().includes(query.toLowerCase())
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
    { id: "fechaDesde", label: "Desde", renderCell: (rowData) => <>{rowData.fechaDesde}</> },
    { id: "fechaHasta", label: "Hasta", renderCell: (rowData) => <>{rowData.fechaHasta}</> },
    // { id: "horaDesde", label: "Hora Desde",  renderCell: (rowData) => <>{rowData.horaDesde}</> },
    // { id: "horaHasta", label: "Hora Hasta", renderCell: (rowData) => <>{rowData.horaHasta}</>  },
    { id: "descripcionDescuento", label: "Descripción Descuento", renderCell: (rowData) => <>{rowData.descripcionDescuento}</> },
    { id: "precioPromocional", label: "Precio Promocional", renderCell: (rowData) => <>{rowData.precioPromocional}</> },
    // { id: "tipoPromocion", label: "Tipo Promoción", renderCell: (rowData) => <>{rowData.tipoPromocion}</>  },
    // {
    //   id: "articulos",
    //   label: "Artículos",
    //   renderCell: (rowData: Row) => {
    //     const promocion = rowData as PromocionType;
    //     return (
    //       <List>
    //         {promocion.articulos.map((articulo) => (
    //           <ListItem key={articulo.id}>
    //             <ListItemText primary={articulo.denominacion} secondary={`Precio: ${articulo.precioVenta}`} />
    //           </ListItem>
    //         ))}
    //       </List>
    //     );
    //   },
    // },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 4 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Promociones
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
            Promoción
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} />
      </Container>
    </Box>
  );
};


export default Promocion;
