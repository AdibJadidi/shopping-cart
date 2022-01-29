import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";
import "./Navigation.css";

function Navigation() {
  const userData = useAuth();
  return (
    <header className="main-navigation">
      <nav>
        <ul>
          <div className="main-navigation__title">Shoes Shop</div>

          <li>
            <NavLink activeClassName="activelink" to="/" exact>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="right-navbar">
          <li>
            <NavLink activeClassName="activelink" to="/cart">
              <span class="cart-icon"></span>
            </NavLink>
          </li>
          <li className="no-margin">
            <NavLink
              className="login"
              activeClassName="activelink"
              to={userData ? "/profile" : "/login"}
            >
              {userData ? `${userData.name}` : <span class="login-icon"></span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
