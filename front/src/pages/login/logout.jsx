import React from "react";
import Axios from "../../interceptors/axios";
import { useDispatch } from "react-redux";
import { logout } from "reducers/userReducer";
// Styles
import { Nav } from "react-bootstrap";

const Logout = () => {
  // Remove Cookie
  const dispatch = useDispatch();

  const userLogout = async () => {
    Axios.get("/auth/logout")
      .then((res) => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link>
            <h5 onClick={userLogout}>Déconnexion</h5>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Logout;
