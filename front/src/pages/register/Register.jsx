import { useState } from "react";
import Axios from "interceptors/axios";
import validationUtils from "helpers/validationUtils";
import validationForms from "helpers/validationForms";
import { Link, useNavigate } from "react-router-dom";
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
      document.querySelector("#form-error").innerHTML =
        "Votre formulaire comprend des erreurs.";
    }
    console.log(isValid);
  }

  // Validator form

  function validate() {
    
    setFormError(validationForms,validationUtils);

    return Object.keys(errors).length < 1;
  }
  return (
    <section>
      <h1>Créer un compte</h1>
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
        <p>Déja inscrit ?</p>
      </form>
      <button className="button-connexion">
          <Link to="/Login">Connection</Link>
      </button>
    </section>
  );
}

export default Register;
