import { useState } from "react";
import { checkRegister } from "helpers/validationForms";
import { Link, useNavigate } from "react-router-dom";
import "../../components/sass/register.scss";
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
      axiosPublic
        .post("/auth/signup", user)
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
      <section className="register">
        <h1 className="register__title">Créer un compte</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <label className="register__label" htmlFor="email">
            Email
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
          <p className="login__invalid-text">{errors.email}</p>
          <label className="register__label" htmlFor="username">
            Pseudo
          </label>
          <input
            className="register__input"
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
          />
          <p className="login__invalid-text">{errors.username}</p>
          <label className="register__label" htmlFor="firstPassword">
            Mot de passe
          </label>
          <input
            className="register__input"
            type="password"
            id="firstPassword"
            name="firstPassword"
            value={values.firstPassword}
            onChange={handleInputChange}
          />
          <p className="login__invalid-text">{errors.firstPassword}</p>
          <label className="register__label" htmlFor="secondPassword">
            Confirmer le mot de passe
          </label>
          <input
            className="register__input"
            type="password"
            id="secondPassword"
            name="secondPassword"
            value={values.secondPassword}
            onChange={handleInputChange}
          />
          <p className="login__invalid-text">{errors.secondPassword}</p>
          <p id="form-error" className="login__invalid-text"></p>
          <button className="register__link" type="submit">
            Créer un compte
          </button>
        </form>
      </section>
      <p className="register__text">
        Déja inscrit ?{" "}
        <Link to="/Login" className="register__link-text">
          identifiez-vous !
        </Link>
      </p>
    </main>
  );
}

export default Register;
