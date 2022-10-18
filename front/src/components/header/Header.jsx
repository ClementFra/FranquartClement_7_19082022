import { NavLink } from "react-router-dom";
import Logo from "../../images/logo-black.png";
import "./Header.css";
import {
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <img src={Logo} alt="logo de groupomania" />
        </NavLink>
        <div className="loginIcon">
          <ul className="logout">
            <NavLink
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              to="/">
              <li className="HideInSmallScreen">Deconnexion</li>
              <li className="IconSmallHeaderLogOut">
                <FontAwesomeIcon
                  className="loginIcon"
                  icon={faRightToBracket}
                />
              </li>
            </NavLink>
          </ul>
          <ul className="Login">
            <NavLink to="/register">
              <li className="HideInSmallScreen">S'inscrire</li>
              <li className="IconSmallHeader">
                <FontAwesomeIcon title="S'inscrire" icon={faRightFromBracket} />
              </li>
            </NavLink>
            <NavLink to="/login">
              <li className="HideInSmallScreen">Connexion</li>
              <li className="IconSmallHeader">
                <FontAwesomeIcon title="Se connecter" icon={faRightToBracket} />
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
    </header>
  );
};
export default Header;
