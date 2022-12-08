/*****************************************************************
 *****************       IMPORT REACT     ************************
 *****************************************************************/
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*****************************************************************
 *****************       IMPORT STYLE    *************************
 *****************************************************************/
import "./Header.css";
import Logo from "../../images/logo-black.png";
import {
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

/*****************************************************************
 *********************        IMPORT    **************************
 *****************************************************************/
import Logout from "pages/login/logout";
import { UidContext } from "contexts/appContext";



const Header = () => {
  // If uid exist the home
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img
            title="logo groupomania"
            aria-label="cliquer sur le logo pour retour a la page d'acceuil"
            src={Logo}
            alt="logo de groupomania"
          />
        </NavLink>
        <div className="loginIcon">
          {uid ? (
            <ul className="welcom-user">
              <li >
                <NavLink to="/profil">
                  <h5>Bienvenue {userData.username}</h5>
                </NavLink>
              </li>
              <NavLink>
                <Logout/>
              </NavLink>
            </ul>
          ) : (
            <ul className="Login">
              <NavLink to="/register">
                <li className="HideInSmallScreen">S'inscrire</li>
                <li className="IconSmallHeader">
                  <FontAwesomeIcon
                    title="S'inscrire"
                    icon={faRightFromBracket}
                  />
                </li>
              </NavLink>
              <NavLink to="/login">
                <li className="HideInSmallScreen">Connexion</li>
                <li className="IconSmallHeader">
                  <FontAwesomeIcon
                    title="Connexion"
                    icon={faRightToBracket}
                  />
                </li>
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
