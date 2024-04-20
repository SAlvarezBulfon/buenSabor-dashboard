import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemText, AppBar, Toolbar, Typography, ListItemIcon, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import InsumosIcon from '@mui/icons-material/Extension';
import useMediaQuery from '@mui/material/useMediaQuery';
import Empresa from '../Empresa/Empresa';
import Producto from '../Producto/Producto';
import Promocion from '../Promocion/Promocion';
import Categoria from '../Categoria/Categoria';
import Insumo from '../Insumo/Insumo';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  subItems?: SubMenuItem[];
  content: React.ReactNode;
  path: string;
}

interface SubMenuItem extends MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const sampleMenuItems: MenuItem[] = [
  {
    text: 'Empresas',
    icon: <BusinessIcon />,
    content: <Empresa />,
    path: '/empresas'
  },
  {
    text: 'Productos',
    icon: <CategoryIcon />,
    subItems: [
      { text: 'Lista de productos', icon: <StoreIcon />, content: <div>Contenido de Lista de productos</div>, path: '/lista-productos' },
      { text: 'Categorías', icon: <InventoryIcon />, content: <Categoria />, path: '/categorias' }
    ],
    content: <Producto />,
    path: '/productos'
  },
  {
    text: 'Promociones',
    icon: <LocalOfferIcon />,
    content: <Promocion />,
    path: '/promociones'
  },
  {
    text: 'Insumos',
    icon: <InsumosIcon />,
    content: <Insumo />,
    path: '/insumos'
  }
];

const ResponsiveDrawer: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // Siempre abierto en desktop
  const [expandedMenuIndex, setExpandedMenuIndex] = useState<number | null>(null);
  const [activeContent, setActiveContent] = useState<React.ReactNode | null>(null); // Estado para el contenido activo
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null); // Estado para el menú de usuario
  const isMobile = useMediaQuery('(max-width: 600px)'); // Verificar si es móvil

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleSubMenu = (index: number) => {
    setExpandedMenuIndex(expandedMenuIndex === index ? null : index);
  };

  const handleMenuItemClick = (content: React.ReactNode) => {
    setActiveContent(content); // Actualizar el contenido activo al hacer clic en un elemento del menú
    if (isMobile) {
      setIsDrawerOpen(false); // Cerrar el drawer en dispositivos móviles después de hacer clic
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <>
        <AppBar position="static" sx={{ bgcolor: '#71c4ef' }}> 
          <Toolbar>
            {isMobile ? (
              <>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                  Dashboard
                </Typography>
                <IconButton color="inherit" onClick={handleOpenUserMenu}>
                  <Avatar alt="User" src="/path/to/your/avatar.jpg" sx={{ bgcolor: '#00668c' }} />
                </IconButton>
              </>
            ) : (
              <>
                <img src="/path/to/your/logo.png" alt="Logo" style={{ marginRight: '16px' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Dashboard
                </Typography>
                <IconButton color="inherit" onClick={handleOpenUserMenu}>
                  <Avatar alt="User" src="/path/to/your/avatar.jpg" sx={{ bgcolor: '#00668c' }} />
                </IconButton>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isDrawerOpen || !isMobile} // Siempre abierto en desktop
          onClose={toggleDrawer}
          variant={isMobile ? 'temporary' : 'persistent'}
          sx={{
            '& .MuiDrawer-paper': { width: '250px'},
          }}
        >
          <List>
            {sampleMenuItems.map((menuItem, index) => (
              <React.Fragment key={index}>
                <Link to={menuItem.path} key={index}  style={{ textDecoration: 'none', color: 'inherit' }} >
                  <ListItem button onClick={() => { toggleSubMenu(index); handleMenuItemClick(menuItem.content); }}>
                    <ListItemIcon>
                      {menuItem.icon}
                    </ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItem>
                </Link>
                {menuItem.subItems && expandedMenuIndex === index && (
                  <List component="div" disablePadding>
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <Link to={subItem.path} key={subIndex}  style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItem button key={subIndex} sx={{ pl: 4 }} onClick={() => handleMenuItemClick(subItem.content)}>
                          <ListItemIcon>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        <Menu
          id="user-menu"
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Account</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Dashboard</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
        </Menu>
        <div style={{ marginLeft: isDrawerOpen && !isMobile ? 250 : 0 }}>
          {activeContent || <Empresa />}
        </div>
      </>
  );
};

export default ResponsiveDrawer