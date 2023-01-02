import React from "react";
import { useSelector } from "react-redux";

//  Components
import Login from "../login/login";
import UpdateProfil from "../../components/profil/updateProfil";

//  Styles
import { Container } from "react-bootstrap";

const Profil = () => {
  const userData = useSelector((state) => state.user.user);
  return (
    <Container fluid>
      {userData ? <UpdateProfil /> : <Login signin={false} signup={true} />}
    </Container>
  );
};

export default Profil;
