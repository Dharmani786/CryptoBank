import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const MenuLIst = () => {
  const [loginMenu, setLoginMenu] = React.useState(null);
  const LoginOpen = Boolean(loginMenu);
  const handleLoginClick = (event) => {
    setLoginMenu(event.currentTarget);
  };
  const handleLoginClose = () => {
    setLoginMenu(null);
  };
  return (
    <div>
      <Button onClick={handleLoginClick}>Dashboard</Button>
      <Menu
        id="basic-menu-login"
        anchorEl={loginMenu}
        open={LoginOpen}
        onClose={handleLoginClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-login",
        }}
      >
        <MenuItem onClick={handleLoginClose}>Profile</MenuItem>
        <MenuItem onClick={handleLoginClose}>My account</MenuItem>
        <MenuItem onClick={handleLoginClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuLIst;
