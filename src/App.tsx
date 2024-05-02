import ResponsiveDrawer from "./components/Common/ResponsiveDrawer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Empresa from "./components/Empresa/Empresa";
import Producto from "./components/Producto/Producto";
import Categoria from "./components/Categoria/Categoria";
import Insumo from "./components/Insumo/Insumo";
import Promocion from "./components/Promocion/Promocion";
import Inicio from "./components/Inicio/Inicio";
import Sucursales from "./components/Empresa/Sucursales/Sucursales";
//import IngresarSucursal from "./components/Empresa/Sucursales/ingresarSucursales";

function App() { 
  return (
    <>
      <Router>
        <ResponsiveDrawer />
        <Routes>
          <Route path="/empresas" element={<Empresa />} />
           {/* Ruta para ver las sucursales de una empresa específica */}
           <Route path="/Empresas/:empresaId/Sucursales" element={<Sucursales />} />
         {/* <Route path="/ingresarSucursales/:id" element={<IngresarSucursal />} /> */}
          <Route path="/productos" element={<Producto />} />
          <Route path="/categorias" element={<Categoria />} />
          <Route path="/insumos" element={<Insumo />} />
          <Route path="/promociones" element={<Promocion />} />
          <Route path="/" element={<Inicio />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;

