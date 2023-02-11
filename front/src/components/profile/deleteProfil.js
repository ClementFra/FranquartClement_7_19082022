import React from "react";

// Actions
import { deleteUser } from "../actions/userActions";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Styles
import { Button } from "react-bootstrap";
import "../sass/profil.scss";

const DeleteProfil = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  const handleDelete = () => dispatch(deleteUser(userData.id));
  return (
    <Button className="nav__button"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre profil?")) {
          handleDelete();
          window.location.href=('/login');
        }
      }}
    >
      Supprimer mon profil
    </Button>
  );
};

export default DeleteProfil;
