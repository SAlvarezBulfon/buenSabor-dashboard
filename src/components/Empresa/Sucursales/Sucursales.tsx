import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface Localidad {
  nombre: string;
  provincia: {
    nombre: string;
    pais: {
      nombre: string;
    };
  };
}

interface Domicilio {
  calle: string;
  numero: number;
  cp: number;
  piso?: number;
  nroDpto?: number;
  localidad: Localidad;
}

interface Sucursal {
  id: number;
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  imagen: string;
  domicilio: Domicilio;
}

const Sucursales = () => {
  const { empresaId } = useParams<{ empresaId: string }>(); // Obtener el ID de la empresa desde la URL
  const [nombreEmpresa, setNombreEmpresa] = useState<string>("");
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [nuevaSucursal, setNuevaSucursal] = useState<Sucursal>({
    id: 0,
    nombre: "",
    horarioApertura: "",
    horarioCierre: "",
    imagen: "",
    domicilio: {
      calle: "",
      numero: 0,
      cp: 0,
      localidad: {
        nombre: "",
        provincia: {
          nombre: "",
          pais: {
            nombre: "",
          },
        },
      },
    },
  });
  const [mostrarDialogCrear, setMostrarDialogCrear] = useState(false);
  const [editando, setEditando] = useState<Sucursal | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("db.json"); // Ruta del archivo JSON
        const data = await response.json();
        // Filtrar las sucursales de la empresa actual basado en el ID
        const empresa = data.empresas.find((empresa: any) => empresa.id === parseInt(empresaId));
        setNombreEmpresa(empresa.nombre); // Establecer el nombre de la empresa
        const sucursalesEmpresaActual = empresa.sucursales || [];
        setSucursales(sucursalesEmpresaActual);
      } catch (error) {
        console.error("Error al cargar las sucursales:", error);
      }
    };

    fetchData();
  }, [empresaId]);

  const handleCrear = () => {
    const nuevaSucursalConId = { ...nuevaSucursal, id: Date.now() };
    setSucursales([...sucursales, nuevaSucursalConId]);
    setNuevaSucursal({
      id: 0,
      nombre: "",
      horarioApertura: "",
      horarioCierre: "",
      imagen: "",
      domicilio: {
        calle: "",
        numero: 0,
        cp: 0,
        localidad: {
          nombre: "",
          provincia: {
            nombre: "",
            pais: {
              nombre: "",
            },
          },
        },
      },
    });
    setMostrarDialogCrear(false);
  };

  const handleEditar = (sucursal: Sucursal) => {
    setEditando(sucursal);
  };

  const handleGuardar = () => {
    if (editando) {
      const nuevasSucursales = sucursales.map((s) => {
        if (s.id === editando.id) {
          return editando;
        }
        return s;
      });
      setSucursales(nuevasSucursales);
      setEditando(null);
    }
  };

  const handleEliminar = (sucursal: Sucursal) => {
    setSucursales(sucursales.filter((s) => s.id !== sucursal.id));
  };

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusqueda(e.target.value);
  };

  const sucursalesFiltradas = sucursales.filter((sucursal) =>
    sucursal.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 11, pr: 3, pt: 4 }}>
     <Button component={Link} to="/empresas" variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Volver 
      </Button>

      <Box sx={{ flexGrow: 1, pl: 0, pr: 4, pt: 1, textAlign: '' }} style={{ marginBottom: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Sucursales de "{nombreEmpresa}"
        </Typography>
      
      </Box>
      

         {/* Agregar nueva sucursal */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button style={{ backgroundColor: '#fb6376', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
              <IconButton aria-label="Crear" onClick={() => setMostrarDialogCrear(true)} sx={{ fontSize: 15 }}>
                <AddIcon />
                <p style={{ margin: 0, marginLeft: '5px' }}> Crear Sucursal</p>
              </IconButton>
            </button>
        </Box>
        
        
     
      <TextField
        label="Buscar sucursal"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={handleBuscar}
      />
      <Grid container spacing={2}>
        {sucursalesFiltradas.map((sucursal) => (
          <Grid key={sucursal.id} item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <Link to={`/ingresarSucursales/${sucursal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={3}>
                    <img src={sucursal.imagen} alt={sucursal.nombre} style={{ maxWidth: '100%', height: 'auto' }} />
                  </Grid>
                  <Grid item xs={9} style={{ paddingTop: '16px' }}>
                    {editando && editando.id === sucursal.id ? (
                      <React.Fragment>
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Nombre"
                          value={editando.nombre}
                          onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                        />
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Horario de Apertura"
                          value={editando.horarioApertura}
                          onChange={(e) => setEditando({ ...editando, horarioApertura: e.target.value })}
                        />
                        <TextField
                          fullWidth
                          margin="dense"
                          label="Horario de Cierre"
                          value={editando.horarioCierre}
                          onChange={(e) => setEditando({ ...editando, horarioCierre: e.target.value })}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography variant="h5" component="div">
                          {sucursal.nombre}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Horario de Apertura: {sucursal.horarioApertura}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          Horario de Cierre: {sucursal.horarioCierre}
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                          <LocationOnIcon /> {sucursal.domicilio.localidad.nombre}, {sucursal.domicilio.localidad.provincia.nombre}, {sucursal.domicilio.localidad.provincia.pais.nombre}
                        </Typography>
                        <Grid item xs={12}>
                          <Typography variant="h5" gutterBottom>
                            <Rating name="clasificacion" defaultValue={0} precision={0.5} />
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              </Link>
              <CardActions>
                {editando && editando.id === sucursal.id ? (
                  <React.Fragment>
                    <Button onClick={handleGuardar} color="primary">
                      Guardar
                    </Button>
                    <Button onClick={() => setEditando(null)} color="primary">
                      Cancelar
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                   
                    <IconButton aria-label="Editar" onClick={() => handleEditar(sucursal)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Eliminar" onClick={() => handleEliminar(sucursal)}>
                      <DeleteIcon />
                    </IconButton>
                  </React.Fragment>
                )}
              </CardActions>
             
            </Card>
          </Grid>
        ))}
     
      </Grid>

      {/* Diálogo para crear */}
      <Dialog open={mostrarDialogCrear} onClose={() => setMostrarDialogCrear(false)}>
        <DialogTitle>Crear Nueva Sucursal</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={nuevaSucursal.nombre}
            onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="horarioApertura"
            label="Horario de Apertura"
            type="text"
            fullWidth
            value={nuevaSucursal.horarioApertura}
            onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, horarioApertura: e.target.value })}
          />
          <TextField
            margin="dense"
            id="horarioCierre"
            label="Horario de Cierre"
            type="text"
            fullWidth
            value={nuevaSucursal.horarioCierre}
            onChange={(e) => setNuevaSucursal({ ...nuevaSucursal, horarioCierre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="calle"
            label="Calle"
            type="text"
            fullWidth
            value={nuevaSucursal.domicilio.calle}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: { ...nuevaSucursal.domicilio, calle: e.target.value },
              })
            }
          />
          <TextField
            margin="dense"
            id="numero"
            label="Número"
            type="number"
            fullWidth
            value={nuevaSucursal.domicilio.numero}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: { ...nuevaSucursal.domicilio, numero: parseInt(e.target.value) },
              })
            }
          />
          <TextField
            margin="dense"
            id="cp"
            label="Código Postal"
            type="number"
            fullWidth
            value={nuevaSucursal.domicilio.cp}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: { ...nuevaSucursal.domicilio, cp: parseInt(e.target.value) },
              })
            }
          />
          <TextField
            margin="dense"
            id="localidad"
            label="Localidad"
            type="text"
            fullWidth
            value={nuevaSucursal.domicilio.localidad.nombre}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: {
                  ...nuevaSucursal.domicilio,
                  localidad: { ...nuevaSucursal.domicilio.localidad, nombre: e.target.value },
                },
              })
            }
          />
          <TextField
            margin="dense"
            id="provincia"
            label="Provincia"
            type="text"
            fullWidth
            value={nuevaSucursal.domicilio.localidad.provincia.nombre}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: {
                  ...nuevaSucursal.domicilio,
                  localidad: {
                    ...nuevaSucursal.domicilio.localidad,
                    provincia: { ...nuevaSucursal.domicilio.localidad.provincia, nombre: e.target.value },
                  },
                },
              })
            }
          />
          <TextField
            margin="dense"
            id="pais"
            label="País"
            type="text"
            fullWidth
            value={nuevaSucursal.domicilio.localidad.provincia.pais.nombre}
            onChange={(e) =>
              setNuevaSucursal({
                ...nuevaSucursal,
                domicilio: {
                  ...nuevaSucursal.domicilio,
                  localidad: {
                    ...nuevaSucursal.domicilio.localidad,
                    provincia: {
                      ...nuevaSucursal.domicilio.localidad.provincia,
                      pais: { ...nuevaSucursal.domicilio.localidad.provincia.pais, nombre: e.target.value },
                    },
                  },
                },
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogCrear(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCrear} color="primary">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sucursales;
