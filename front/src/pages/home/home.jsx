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
      <article id="welcomeMessage">
          <h1>Bienvenue sur votre réseau social d'entreprise</h1>
          <p>
            Bienvenue sur ce nouvel outil de partage créé pour les employé(e)s
            du Groupe Groupomania. Découvrez toutes les fonctionnalités
            disponibles pour partager vos expériences avec vos collègues. Créez
            un compte et connectez vous pour pouvoir y accéder.
          </p>
      </article>
      <article id="toolsDescription">
        <h2>Description des fonctions disponibles sur le réseau</h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            <p>Poster vos messages</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCommentDots} />
            <p>Liker-Disliker les posts de vos collègues</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faImages} />
            <p>Ajouter une image à votre message</p>
          </li>
        </ul>
      </article>
    </>
  );
};

export default Home;