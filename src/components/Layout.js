// import { Avatar, Box, ListItem, Toolbar, Typography } from "@mui/material";
// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// import AppBar from '@mui/material/AppBar';
import { format } from "date-fns";
// ======================
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Masonry from "react-masonry-css";
const drawerWidth = 240;
// ===================================
// const drawerWidth = 240;

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];
  const theme = useTheme();
  const StyledTitle = styled(Typography)(() => ({
    padding: theme.spacing(2),
  }));

  // ============================
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div>
        <StyledTitle variant="h5" padding={1.5}>
          My Note
        </StyledTitle>
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            onClick={() => navigate(item.path)}
            style={{ padding: "0" }}
          >
            <ListItemButton
              style={{
                padding: "14px 16px",
                backgroundColor: location.pathname === item.path && "#f4f4f4",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );


  // ======================
  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
         elevation={1}
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography style={{ flex: "1" }}>
              Today is the {format(new Date(), "do MMMM y")}
            </Typography>
            <Typography>Mario</Typography>
            <Avatar
              src="/mario-av.png"
              style={{ marginLeft: theme.spacing(2) }}
            ></Avatar>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: { xs: `100vh` },
          }}
          style={{backgroundColor: "#fafafa"}}
          
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
  );
}
