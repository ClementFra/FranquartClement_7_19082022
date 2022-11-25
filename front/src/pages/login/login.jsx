// Immport function validation form
import { checkLogin } from "helpers/validationLogin";

// Import react 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import Style
import "./login.css";

// Import Interceptor
import Axios from "interceptors/axios";


function Login() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [values, setUser] = useState(initialValues);
  const [errors, setFormError] = useState({});
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, values } = e.target;
    setUser({ ...values, [name]: values });
    setFormError({
      ...errors,
      [name]: "",
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      ...values
    };
    let isValid = validate();
    if (isValid) {
      Axios.post("/auth/login", user)
        .then((res) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }else {
      document.querySelector("#log-error").innerHTML =
        "La connexion comprend une erreur.";
    }
    console.log(isValid);
  }

  function validate() {
    setFormError(checkLogin(values));
    return Object.keys(errors).length < 1;
  }

  return (
    <section>
      <h1>Vous connecter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <p className="non-valid">{errors.email}</p>
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <p className="non-valid">{errors.password}</p>
        <button type="submit">connexion</button>
      </form>
      <p id="log-error" className="non-valid"></p>
      <p>Pas de compte ?</p>
      <button className="button-connexion">
        <Link to="/Register">S'enregistrer</Link>
      </button>
    </section>
  );
}

export default Login;
