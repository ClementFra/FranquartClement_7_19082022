import React from "react";
import "./home.css";
import {
  faImages,
  faEnvelopeOpenText,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <>
      <div className="welcomeMessage">
        <article id="descriptionOfTheSite">
          <h1>Bienvenue sur votre réseau social d'entreprise</h1>
          <p>
            Bienvenue sur ce nouvel outil de partage créé pour les employé(e)s
            du Groupe Groupomania. Découvrez toutes les fonctionnalités
            disponibles pour partager vos expériences avec vos collègues. Créez
            un compte et connectez vous pour pouvoir y accéder.
          </p>
        </article>
      </div>
      <div className="toolsDescription">
        <h2>Description des fonctions disponibles sur le réseau</h2>
        <ul className="displayIconsInfo">
          <li className="iconContainer">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            <p>Poster vos messages</p>
          </li>
          <li className="iconContainer">
            <FontAwesomeIcon icon={faCommentDots} />
            <p>Liker-Disliker les posts de vos collègues</p>
          </li>
          <li className="iconContainer">
            <FontAwesomeIcon icon={faImages} />
            <p>Ajouter une image à votre message</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Home;