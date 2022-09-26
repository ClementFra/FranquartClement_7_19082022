import { NavLink } from "react-router-dom";
import Logo from "../../images/logo.png";
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
              to="/"
            >
              <li className="HideInSmallScreen">Se déconnecter</li>
              <li className="IconSmallHeaderLogOut">
                <FontAwesomeIcon
                  className="loginIcon"
                  icon={faRightToBracket}
                />
              </li>
            </NavLink>
          </ul>
          <NavLink to="/login">
            <ul className="Login" >
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
                <li className="HideInSmallScreen">Se connecter</li>
                <li className="IconSmallHeader">
                  <FontAwesomeIcon
                    title="Se connecter"
                    icon={faRightToBracket}
                  />
                </li>
              </NavLink>
            </ul>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
export default Header;
