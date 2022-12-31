/*****************************************************************
 *****************       IMPORT REACT     ************************
 *****************************************************************/
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

/*****************************************************************
 *****************       IMPORT STYLE    *************************
 *****************************************************************/
import "./Header.css";
import Logo from "../../images/logo-black.png";

/*****************************************************************
 *********************        IMPORT    **************************
 *****************************************************************/
import Logout from "pages/login/logout";

const Header = () => {
  // If uid exist the home
  const userData = useSelector((state) => state.user.user);
  return (
      <header className="header_page">
        <NavLink to="/">
          <img className="header_page_image"
            title="logo groupomania"
            aria-label="cliquer sur le logo pour retour a la page d'acceuil"
            src={Logo}
            alt="logo de groupomania"
          />
        </NavLink>
          {userData ? (
            <ul className="header_page_userlogged">
              <li>
                <NavLink to="/profil">
                  <h5>Bienvenue {userData.username}</h5>
                </NavLink>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          ) : (
            <ul className="header_page_userlogin">
              <NavLink to="/login">
                <li className="header_page_userlogin_li">Connexion</li>
              </NavLink>
              <NavLink to="/register">
                <li className="header_page_userlogin_li">S'inscrire</li>
              </NavLink>
            </ul>
          )}
      </header>
  );
};
export default Header;
