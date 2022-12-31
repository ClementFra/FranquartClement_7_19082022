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
      <section className="home_page_section_welcome">
        <h1 className="home_page_section_h1">
          Bienvenue sur votre réseau social d'entreprise
        </h1>
        <p className="home_page_section_p">
          Bienvenue sur ce nouvel outil de partage créé pour les employé(e)s du
          Groupe Groupomania. Découvrez toutes les fonctionnalités disponibles
          pour partager vos expériences avec vos collègues. Créez un compte et
          connectez vous pour pouvoir y accéder.
        </p>
      </section>
      <section className="home_page_section_tools">
        <h2 className="home_page_section_tools_h2">
          Description des fonctions disponibles sur le réseau
        </h2>
        <ul className="home_page_section_ul">
          <li className="home_page_section_li">
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
            <p className="home_page_section_li_p">Poster vos messages</p>
          </li>
          <li className="home_page_section_li">
            <FontAwesomeIcon icon={faCommentDots} />
            <p className="home_page_section_li_p">
              Liker-Disliker les posts de vos collègues
            </p>
          </li>
          <li className="home_page_section_li">
            <FontAwesomeIcon icon={faImages} />
            <p className="home_page_section_li_p">
              Ajouter une image à votre message
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
