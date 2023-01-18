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

  const handleDelete = () => dispatch(deleteUser(userData._id));

  return (
    <Button className="update__button"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre profil?")) {
          handleDelete();
          // window.location.href = "/";
        }
      }}
    >
      Supprimer mon profil
    </Button>
  );
};

export default DeleteProfil;
