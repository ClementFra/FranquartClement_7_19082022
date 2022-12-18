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
  console.log(userData);
  return (
    <body>
      <header>
        <NavLink to="/">
          <img
            title="logo groupomania"
            aria-label="cliquer sur le logo pour retour a la page d'acceuil"
            src={Logo}
            alt="logo de groupomania"
          />
        </NavLink>
        <main>
          {userData ? (
            <ul id="userLog">
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
            <ul>
              <NavLink to="/login">
                <li>Connexion</li>
              </NavLink>
              <NavLink to="/register">
                <li>S'inscrire</li>
              </NavLink>
            </ul>
          )}
        </main>
      </header>
    </body>
  );
};
export default Header;
