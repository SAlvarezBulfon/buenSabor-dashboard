import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Categoria from '../../types/Categoria';

interface CategoriaListaProps {
  categorias: Categoria[];
}

const CategoriaLista: React.FC<CategoriaListaProps> = ({ categorias }) => {
  const [openMap, setOpenMap] = React.useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpenMap((prevOpenMap) => ({
      ...prevOpenMap,
      [id]: !prevOpenMap[id],
    }));
  };

  const renderCategoria = (categoria: Categoria) => {
    const isOpen = openMap[categoria.id] || false;
    const tieneSubcategorias = categoria.subCategorias && categoria.subCategorias.length > 0;

    return (
      <React.Fragment key={categoria.id}>
        <ListItemButton onClick={() => handleClick(categoria.id)}>
          <ListItemText primary={categoria.denominacion} />
          {tieneSubcategorias && (isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
        </ListItemButton>
        {tieneSubcategorias && (
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categoria.subCategorias.map((subcategoria) => (
                <ListItemButton key={subcategoria.id} sx={{ pl: 4 }}>
                  <ListItemText primary={subcategoria.denominacion} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const categoriasPrincipales = categorias.filter(categoria => !categorias.some(cat => cat.subCategorias?.some(sub => sub.id === categoria.id)));

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Categorías
        </ListSubheader>
      }
    >
      {categoriasPrincipales.map((categoria) => renderCategoria(categoria))}
    </List>
  );
};

export default CategoriaLista;
