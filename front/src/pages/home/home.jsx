import React from "react";
import "../../components/sass/home.scss";
import {
  faImages,
  faEnvelopeOpenText,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <>
      <section className="welcome">
        <h1 className="welcome__title">
          Bienvenue sur votre réseau social d'entreprise
        </h1>
        <p className="welcome__text">
          Bienvenue sur ce nouvel outil de partage créé pour les employé(e)s du
          Groupe Groupomania. Découvrez toutes les fonctionnalités disponibles
          pour partager vos expériences avec vos collègues. Créez un compte et
          connectez vous pour pouvoir y accéder.
        </p>
      </section>
      <section className="welcome__tools">
        <h2 className="welcome__tools--titles">
          Description des fonctions disponibles sur le réseau
        </h2>
        <ul className="welcome__list">
          <li className="welcome__list--active">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            <p className="welcome__list--text">Poster vos messages</p>
          </li>
          <li className="welcome__list--active">
            <FontAwesomeIcon icon={faCommentDots} />
            <p className="welcome__list--text">
              Liker-Disliker les posts de vos collègues
            </p>
          </li>
          <li className="welcome__list--active">
            <FontAwesomeIcon icon={faImages} />
            <p className="welcome__list--text">
              Ajouter une image à votre message
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
