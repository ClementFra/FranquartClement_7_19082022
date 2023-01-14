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
      <section className="function">
        <h2 className="function__title">
          Description des fonctions disponibles sur le réseau
        </h2>
        <ul className="function__list">
          <li className="function__item">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            <p className="function__text">Poster vos messages</p>
          </li>
          <li className="function__item">
            <FontAwesomeIcon icon={faCommentDots} />
            <p className="function__text">
              Liker-Disliker les posts de vos collègues
            </p>
          </li>
          <li className="function__item">
            <FontAwesomeIcon icon={faImages} />
            <p className="function__text">
              Ajouter une image à votre message
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
