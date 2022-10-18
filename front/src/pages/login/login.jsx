//import { useRef, useState, useEffect, useContext } from "react";
//import { Navigate } from "react-router-dom";
import "./login.css";
//import Register from "./Register";
function Login() {
  return (
    <section>
      <article>
        <h1>Vous connecter</h1>
      </article>
      <form>
        <label>Email</label>
        <input></input>
        <label>Mot de passe</label>
        <input></input>
        <button>connexion</button> 
        <p>
          Pas de compte ?<br />
          <button>
            <a href="http://localhost:8080/Register">S'enregister</a>
          </button>
        </p>
      </form>
    </section>
  );
}

export default Login;
