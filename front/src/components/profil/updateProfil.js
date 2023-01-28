import React, { useState } from "react";

//  Actions
import { updateUser } from "../actions/userActions";

//  Components
import DeleteProfil from "./deleteProfil";
import UploadImage from "./uploadImage";

//  Redux
import { useDispatch, useSelector } from "react-redux";

//  Styles
import { Button } from "react-bootstrap";
import "../sass/profil.scss";

//  Utils
import { dateParser } from "../utils/utils";

const UpdateProfil = () => {
  const [biography, setBiography] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateUser(userData.id, biography));
    setUpdateForm(false);
  };

  return (
    <section className="profil">
      <div className="card">
        <article className="profil__informations">
          <div>
            <h1 className="profil__username">{userData.username}</h1>
            <div>
              <img
                className="profil__image"
                src="https://cdn.pixabay.com/photo/2015/01/09/11/09/meeting-594091_960_720.jpg"
                alt="avatar"
              />
            </div>
            <UploadImage />
          </div>
        </article>
        <article className="nav__profil">
          <div>
            <h2 className="nav__title">Biographie</h2>
            <p className="nav__texts">
              {userData.biography ? userData.biography : "Vive Groupomania"}
            </p>
            {updateForm === false && (
              <Button
                className="nav__button"
                onClick={() => setUpdateForm(!updateForm)}
              >
                Modifier ma biographie
              </Button>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.biography}
                  onChange={(e) => setBiography(e.target.value)}
                ></textarea>
                <Button onClick={handleUpdate}>Valider</Button>
              </>
            )}
            <article className="member">
              <p className="member__date">
                Membre depuis {dateParser(userData.createdAt)}
              </p>
              <DeleteProfil />
            </article>
          </div>
        </article>
      </div>
    </section>
  );
};

export default UpdateProfil;
