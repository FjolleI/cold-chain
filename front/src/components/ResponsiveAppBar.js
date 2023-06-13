import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const pages = [
  { name: "Home", path: "Home" },
  { name: "Drugs", path: "Products" },
  { name: "Staff", path: "Workers" },
  { name: "Order", path: "Status" },
  { name: "Details", path: "Data" },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(55, 49, 49, 0.7)",
    },
  },
});

const ResponsiveAppBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Coldchain
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
          <div style={{ height: "250px" }}>
            <List style={{ width: "250px" }}>
              {pages.map((page) => (
                <ListItemButton
                  key={page.path}
                  onClick={handleDrawerClose}
                  component={Link}
                  to={`/${page.path}`}
                >
                  <ListItemText primary={page.name} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default ResponsiveAppBar;
