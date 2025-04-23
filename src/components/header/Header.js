import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <NavLink to="/artwork">Artwork</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/contactUs">Contact Us</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </div>
    )
}

export default Header;