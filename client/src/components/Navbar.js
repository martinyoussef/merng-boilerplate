import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

//Material UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ForumIcon from "@material-ui/icons/Forum";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const menuBar = user ? (
    <AppBar style={{ flexGrow: 1 }}>
      <Toolbar>
        <span style={{ flexGrow: 1 }}></span>
        <Button color="inherit" component={Link} to="/">
          {user.username}
        </Button>
        <Tooltip title="Logout">
          <IconButton color="inherit" onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  ) : (
    <AppBar style={{ flexGrow: 1 }}>
      <Toolbar>
        <span style={{ flexGrow: 1 }}></span>
        <Tooltip title="View comments">
          <IconButton color="inherit" component={Link} to="/">
            <ForumIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Register">
          <IconButton color="inherit" component={Link} to="/register">
            <VpnKeyIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Login">
          <IconButton color="inherit" component={Link} to="/login">
            <LockOpenIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
  return menuBar;
}

export default Navbar;
