import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, CardActions, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Rating } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

// Define el tipo Empresa
interface Empresa {
  id: number;
  nombre: string;
  razonSocial: string;
  cuil: number;
  
}

const Empresas = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [editando, setEditando] = useState<Empresa | null>(null);
  const [nuevaEmpresa, setNuevaEmpresa] = useState<Empresa>({ id: 0, nombre: "", razonSocial: "", cuil: 0 });
  const [mostrarDialogCrear, setMostrarDialogCrear] = useState(false);
  const [mostrarDialogInfo, setMostrarDialogInfo] = useState<Empresa | null>(null);
  const [mostrarDialogEliminar, setMostrarDialogEliminar] = useState<Empresa | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("db.json"); // Ruta del archivo JSON
        const data = await response.json();
        setEmpresas(data.empresas);
      } catch (error) {
        console.error("Error al cargar las empresas:", error);
      }
    };

    fetchData();
  }, []);

  const empresasFiltradas = empresas.filter(empresa =>
    empresa.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEditar = (empresa: Empresa) => {
    setEditando(empresa);
  };

  const handleGuardar = () => {
    if (editando) {
      const nuevasEmpresas = empresas.map((emp) => {
        if (emp.id === editando.id) {
          return { ...emp, nombre: editando.nombre, razonSocial: editando.razonSocial, cuil: editando.cuil };
        }
        return emp;
      });
      setEmpresas(nuevasEmpresas);
      setEditando(null);
    }
  };

  const handleEliminar = (empresa: Empresa) => {
    setMostrarDialogEliminar(empresa);
  };

  const confirmarEliminar = () => {
    setEmpresas(empresas.filter(emp => emp.id !== (mostrarDialogEliminar as Empresa).id));
    setMostrarDialogEliminar(null);
  };

  const handleCrear = () => {
    // Obtener el máximo id actual
    const maxId = empresas.reduce((max, empresa) => (empresa.id > max ? empresa.id : max), 0);
    // Generar el nuevo id sumándole 1 al máximo id actual
    const nuevoId = maxId + 1;
    
    const lastEmpresa = empresas[empresas.length - 1];
    const nuevaEmpresaConId = { ...nuevaEmpresa, id: nuevoId };
    setEmpresas([...empresas, nuevaEmpresaConId]);
    setNuevaEmpresa({ id: 0, nombre: "", razonSocial: "", cuil: 0 });
    setMostrarDialogCrear(false);
  };
  const handleInfo = (empresa: Empresa) => {
    setMostrarDialogInfo(empresa);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, pl: 12, pr: 4, pt: 4 }}>
      <Box sx={{ flexGrow: 1, pl: 0, pr: 4, pt: 1, textAlign: '' }} style={{ marginBottom: '50px' }}>
        <Typography variant="h4" gutterBottom>
          Empresas
        </Typography>
        
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button style={{ backgroundColor: '#fb6376', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
    <IconButton aria-label="Crear" onClick={() => setMostrarDialogCrear(true)} sx={{ fontSize: 15 }}>
      <AddIcon />
      <p style={{ margin: 0, marginLeft: '5px' }}> Crear empresa</p>
    </IconButton>
  </button>
</Box>



      <TextField
        label="Buscar empresa"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Grid container spacing={2}>
        {empresasFiltradas.map((empresa) => (
          <Grid key={empresa.id} item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f5f5f5' }}>
            <Link to={`/Empresas/${empresa.id}/Sucursales`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent>
                <Grid container alignItems="center">
                  <Grid item xs={12} sx={{ pl: 2 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                      <div>
                        {editando && editando.id === empresa.id ? (
                          <React.Fragment>
                            <TextField
                              label="Nombre"
                              fullWidth
                              margin="normal"
                              value={editando.nombre}
                              onChange={(e) => setEditando({ ...editando, nombre: e.target.value })}
                            />
                            <TextField
                              label="Razón Social"
                              fullWidth
                              margin="normal"
                              value={editando.razonSocial}
                              onChange={(e) => setEditando({ ...editando, razonSocial: e.target.value })}
                            />
                            <TextField
                              label="CUIL"
                              fullWidth
                              margin="normal"
                              value={editando.cuil}
                              onChange={(e) => setEditando({ ...editando, cuil: parseInt(e.target.value) })}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                              {empresa.nombre}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                              Razon Social: {empresa.razonSocial}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                              CUIL: {empresa.cuil}
                            </Typography>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
    <Typography variant="h5" gutterBottom>
  
    </Typography>
    <Rating name="clasificacion" defaultValue={0} precision={0.5} />
  </Grid>
                </Grid>
              </CardContent>
              </Link>
              <CardActions>
                {editando && editando.id === empresa.id ? (
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
                    <IconButton aria-label="Editar" onClick={() => handleEditar(empresa)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Eliminar" onClick={() => handleEliminar(empresa)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Info" onClick={() => handleInfo(empresa)}>
                      <InfoIcon />
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
        <DialogTitle>Crear Nueva Empresa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            value={nuevaEmpresa.nombre}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="razonSocial"
            label="Razón Social"
            type="text"
            fullWidth
            value={nuevaEmpresa.razonSocial}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, razonSocial: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cuil"
            label="CUIL"
            type="number"
            fullWidth
            value={nuevaEmpresa.cuil}
            onChange={(e) => setNuevaEmpresa({ ...nuevaEmpresa, cuil: parseInt(e.target.value) })}
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

      {/* Diálogo para mostrar información */}
      <Dialog open={Boolean(mostrarDialogInfo)} onClose={() => setMostrarDialogInfo(null)}>
        <DialogTitle>Información de la Empresa</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {mostrarDialogInfo && mostrarDialogInfo.nombre}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Razon Social: {mostrarDialogInfo && mostrarDialogInfo.razonSocial}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            CUIL: {mostrarDialogInfo && mostrarDialogInfo.cuil}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMostrarDialogInfo(null)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para confirmar eliminación */}
      <Dialog open={Boolean(mostrarDialogEliminar)} onClose={() => setMostrarDialogEliminar(null)}>
        <DialogTitle>Desea eliminar la empresa "{mostrarDialogEliminar && mostrarDialogEliminar.nombre}"?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setMostrarDialogEliminar(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminar} color="primary" autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Empresas