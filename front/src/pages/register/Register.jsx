import { useState } from "react";
import Axios from "interceptors/axios";
import { checkRegister } from "helpers/validationForms";
import { Link, useNavigate } from "react-router-dom";
import "./register.css"
import axiosPublic from "interceptors/axiosPublic";

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
    setFormError({
      ...errors,
      [name]: "",
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
      axiosPublic.post("/auth/signup", user)
        .then((res) => {
          navigate("/Login");
        })
        .catch((error) => {
          console.log(error);
        });
      //API call to server
    } else {
      document.querySelector("#form-error").innerHTML =
        "Votre formulaire comprend des erreurs.";
    }
    console.log(isValid);
  }

  // Validator form

  function validate() {
    setFormError(checkRegister(values));

    return Object.keys(errors).length < 1;
  }
  return (
      <main>
        <section className="register_page">
          <h1 className="register_page_h1">Créer un compte</h1>
          <form className="register_page_form" onSubmit={handleSubmit}>
            <label className="register_page_label" htmlFor="email">Email:</label>
            <input className="register_page_input"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
            <p className="login_page_section_form_invalid">{errors.email}</p>
            <label className="register_page_label" htmlFor="username">Pseudo:</label>
            <input className="register_page_input"
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
            />
            <p className="login_page_section_form_invalid">{errors.username}</p>
            <label className="register_page_label" htmlFor="firstPassword">Mot de passe:</label>
            <input className="register_page_input"
              type="password"
              id="firstPassword"
              name="firstPassword"
              value={values.firstPassword}
              onChange={handleInputChange}
            />
            <p className="login_page_section_form_invalid">{errors.firstPassword}</p>
            <label className="register_page_label" htmlFor="secondPassword">Confirmer le mot de passe:</label>
            <input className="register_page_input"
              type="password"
              id="secondPassword"
              name="secondPassword"
              value={values.secondPassword}
              onChange={handleInputChange}
            />
            <p className="login_page_section_form_invalid">{errors.secondPassword}</p>
            <p id="form-error" className="login_page_section_form_invalid"></p>
            <button className="register_page_button" type="submit">Créer un compte</button>
            <p>Déja inscrit ?</p>
          </form>
          <button className="register_page_link_login">
            <Link to="/Login" className="link_login">Connexion</Link>
          </button>
        </section>
      </main>
  );
}

export default Register;
