import ResponsiveDrawer from "./components/Common/ResponsiveDrawer"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Empresa from "./components/Empresa/Empresa";
import Producto from "./components/Producto/Producto";
import Categoria from "./components/Categoria/Categoria";
import Insumo from "./components/Insumo/Insumo";
import Promocion from "./components/Promocion/Promocion";
function App() { 

  return (
    <>
      <Router>
        <ResponsiveDrawer />
          <Routes>
            <Route  path="/empresas" element={<Empresa />} />
            <Route  path="/productos" element={<Producto />} />
            <Route  path="/categorias" element={<Categoria />} />
            <Route  path="/insumos" element={<Insumo />} />
            <Route  path="/promociones" element={<Promocion />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
