import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import InputBase from "@mui/material/InputBase";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    // const { window } = this.props;
  }

  handleDrawerToggle = async () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  };

  drawer = (
    <Box onClick={this.handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Stock Management App
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Dashbord
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <Link
              to="/AddItem"
              style={{ textDecoration: "none", color: "black" }}
            >
              Add Items
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  container =
    this.props.window !== undefined ? () => window().document.body : undefined;

  render() {
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            color: "white",
            background:
              "linear-gradient(145deg, #c06c84 10%,#ad5389  60%, #89216B  )",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Stock Management App
            </Typography>

            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button sx={{ color: "#fff" }}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Dashbord
                </Link>
              </Button>
              <Button sx={{ color: "#fff" }}>
                <Link
                  to="/AddItem"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Add Items
                </Link>
              </Button>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={this.container}
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {this.drawer}
          </Drawer>
        </Box>
      </Box>
    );
  }
}
NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
