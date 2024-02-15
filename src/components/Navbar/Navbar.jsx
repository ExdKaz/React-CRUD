import "./Navbar.css";
import { React, useState } from "react";
import { MenuItem, Menu } from "semantic-ui-react";
function Navbar() {
  const [activeItem, setActiveItem] = useState(null);
  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <Menu>
      <MenuItem
        name="register"
        active={activeItem === "register"}
        onClick={handleItemClick}
        href="/registerUser"
      >
        Register
      </MenuItem>

      <MenuItem
        name="users"
        active={activeItem === "users"}
        onClick={handleItemClick}
        href="/getUsers"
      >
        View Users
      </MenuItem>

      <MenuItem
        name="updateUser"
        active={activeItem === "updateUser"}
        onClick={handleItemClick}
        href="/edit"
      >
        Update User
      </MenuItem>
    </Menu>
  );
}

export default Navbar;
