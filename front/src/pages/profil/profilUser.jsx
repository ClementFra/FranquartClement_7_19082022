import React from "react";

//  Redux
import { useSelector } from "react-redux";

//  Styles
import "../sass/profil.scss";

//  Utils
import { dateParser } from "../utils/utils";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.user.user);

  return (
    <section className="profil">
      <div className="card">
        <article className="profil__informations">
          <div>
            <div>
              <img
                className="profil__image"
                src="https://www.pngall.com/wp-content/uploads/12/Avatar-PNG-Image.png"
                alt="avatar"
              />
            </div>
            <h1 className="profil__username">@{userData.username}</h1>
          </div>
        </article>
        <article className="nav__profil">
          <div>
            <h2 className="nav__title">Biographie</h2>
            {userData.biography}
            <article className="member">
              <p className="member__date">
                Membre depuis {dateParser(userData.createdAt)}
              </p>
            </article>
          </div>
        </article>
      </div>
    </section>
  );
};

export default UpdateProfil;