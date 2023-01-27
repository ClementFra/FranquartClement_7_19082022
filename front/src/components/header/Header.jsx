/*****************************************************************
 *****************       IMPORT REACT     ************************
 *****************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

/*****************************************************************
 *****************       IMPORT STYLE    *************************
 *****************************************************************/
import "../sass/header.scss";
import Logo from "../../images/logo-black.png";

/*****************************************************************
 *********************        IMPORT    **************************
 *****************************************************************/
import Logout from "pages/login/logout";

const Header = () => {
  const userData = useSelector((state) => state.user.user);
  return (
    <header className="header">
      <NavLink to="/">
        <img
          className="header__logo"
          title="logo groupomania"
          aria-label="cliquer sur le logo pour retour a la page d'acceuil"
          src={Logo}
          alt="logo de groupomania"
        />
      </NavLink>
      {userData ? (
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink to="/profil">
              <h5 className="nav__text">Bienvenue {userData.username}</h5>
            </NavLink>
          </li>
          <li className="nav__item">
            <Logout />
          </li>
        </ul>
      ) : (
        <ul className="nav__list">
          <NavLink to="/login">
            <li className="nav__list-text">Connexion</li>
          </NavLink>
          <NavLink to="/register">
            <li className="nav__list-text">S'inscrire</li>
          </NavLink>
        </ul>
      )}
    </header>
  );
};
export default Header;
