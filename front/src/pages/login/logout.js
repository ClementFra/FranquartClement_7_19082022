import React from "react";
import cookie from "js-cookie";
import Axios from "../../interceptors/axios";
import { useDispatch } from "react-redux";

// Styles
import { Nav } from "react-bootstrap";

const Logout = () => {
  // Remove Cookie
  const dispatch = useDispatch();
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    Axios.get("/user/logout")
      .then((res) => {
        dispatch(Logout);
        removeCookie("jwt");
      })
      .catch((error) => {
        console.log(error);
      });

    window.location = "/";
  };

  return (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link>
            <h5 onClick={logout}>Déconnexion</h5>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Logout;
