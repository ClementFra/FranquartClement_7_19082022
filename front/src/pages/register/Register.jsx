import { useState } from "react";
import Axios from "interceptors/axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const initialValues = {
    email: "",
    username: "",
    firstPassword: "",
    secondPassword: "",
  };
  // Constantes
  const [values, setValues] = useState(initialValues);
  const [errors, setFormError] = useState({});
  const navigate = useNavigate();

  // Function Form

  function handleInputChange(e) {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      ...values,
      password: values.firstPassword,
    };
    let isValid = validate();

    if (isValid) {
      Axios.post("/auth/signup", user)
      .then((res) => {
        navigate("/Login");
      })
      .catch((error) => {
        console.log(error);
      });
      //API call to server
    } else {
      document.querySelector("#form-error").innerHTML = "Votre formulaire comprend des erreurs.";
    }
    console.log(isValid);
     
  }

  // Validator form

  function validate () {
    const errors = {};
    const regexUsername = new RegExp(
      /^(?=.{3,50}$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/
    );
    const regexEmail = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    const regexPwd = new RegExp(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
    );
    // Errors email

    if (values.email === "") {
      errors.email = "Un email est requis !";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Le format de votre email est invalide !";
    }

    // Errors username

    if (values.username === "") {
      errors.username = "Un pseudo est requis !";
    } else if (!regexUsername.test(values.username)) {
      errors.username =
        "Le format de votre pseudo doit contenir 3 carractères minimum et 50 carractères maximum !";
    }
    // Errors firstpassword

    if (values.firstPassword === "") {
      errors.firstPassword = "Un mot de passe est requis !";
    } else if (!regexPwd.test(values.firstPassword)) {
      errors.firstPassword =
        "Le format de votre mot de passe doit contenir 8 carractères avec une Majuscule, Minuscule, carractères alphanumérique et un carractères spécial !";
    }

    // Errors secondpassword

    if (values.secondPassword === "") {
      errors.secondPassword = "la confirmation du  mot de passe est requise !";
    } else if (values.secondPassword !== values.firstPassword) {
      errors.secondPassword = "Les mots de passe doivent être identiques !";
    }
    setFormError({ ...errors });

    return Object.keys(errors).length < 1;
  };
  return (
    <section>
      <h1>Créer un compte</h1>
      <article>
      </article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <p className="non-valid">{errors.email}</p>
        <label htmlFor="username">Pseudo:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />
        <p className="non-valid">{errors.username}</p>
        <label htmlFor="firstPassword">Mot de passe:</label>
        <input
          type="password"
          id="firstPassword"
          name="firstPassword"
          value={values.firstPassword}
          onChange={handleInputChange}
        />
        <p className="non-valid">{errors.firstPassword}</p>
        <label htmlFor="secondPassword">Confirmer le mot de passe:</label>
        <input
          type="password"
          id="secondPassword"
          name="secondPassword"
          value={values.secondPassword}
          onChange={handleInputChange}
        />
        <p className="non-valid">{errors.secondPassword}</p>
        <p id="form-error" className="non-valid"></p>
        <button type="submit">Créer un compte</button>
        <p>
          <b>Déja inscrit ?</b>
            <a href="http://localhost:8080/Login">Connexion</a>
        </p>
      </form>
    </section>
  );
}

export default Register;
