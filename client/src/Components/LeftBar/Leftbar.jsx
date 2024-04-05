import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SettingsIcon from "@material-ui/icons/Settings";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"; // Icon for retract button
import { useNavigate, useLocation } from "react-router-dom";
import "./leftbar.css";
import "../Navbar/nav.css";
// import Logo from "../img/logo2.png";

const LeftBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const location = useLocation(); // Initialize the useLocation hook
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false); // State variable for theme switcher

  const handleIconClick = (componentName) => {
    // Implement the logic to navigate to the respective component
    switch (componentName) {
      case "Home":
        navigate("/home");
        break;
      case "Notifications":
        navigate("/home/appointments");
        break;
      case "Settings":
        navigate("/home/settings");
        break;
      case "Theme Switcher":
        // Show the theme switcher popup
        setShowThemeSwitcher(true);
        break;
      case "Logout":
        navigate("/home/logout");
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      className={isOpen ? "leftbar open" : "leftbar"}
      style={{ top: "40px" }}
    >
      <div className="toolbar">
        <ChevronLeftIcon onClick={onClose} className="retract-button" />
      </div>
      {/* <img className="brand" src={Logo} alt="logo" /> */}

      <List>
        <div className="nothing"></div>
        <div
          onClick={() => handleIconClick("Home")}
          className={location.pathname === "/home" ? "active" : ""}
        >
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </div>
        <div
          onClick={() => handleIconClick("Notifications")}
          className={location.pathname === "/notifications" ? "active" : ""}
        >
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItem>
        </div>
        <div
          onClick={() => handleIconClick("Settings")}
          className={location.pathname === "/settings" ? "active" : ""}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </div>

        <div
          onClick={() => handleIconClick("Logout")}
          className={location.pathname === "/logout" ? "active" : ""}
        >
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
};

export default LeftBar;
