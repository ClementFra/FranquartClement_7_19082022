import { useState, useEffect } from "react";
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
  const [isSubmit, setIsSubmit] = useState(false);
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
    setFormError(validate(values));
    setIsSubmit(true);
    Axios.post("/auth/signup", user)
      .then((res) => {
        navigate("/Login");
      })
      .catch((error) => {
        alert("Profil non créer");
      });
  }
  useEffect(() => {
    if (Object.keys(errors).lenght === 0 && isSubmit) {
      console.log(values);
    }
  }, [errors]);

  // Validator form

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Un email est requis !";
    } else if (!regex.test(values.email)) {
      errors.email = "Le format de votre email est invalide !";
    }
    if (!values.username) {
      errors.username = "Un pseudo est requis !";
    } else if (values.username < 3) {
      errors.username = "Votre pseudo doit contenir minimum 3 carractères !";
    } else if (values.username > 50) {
      errors.username =
        "Votre pseudo doit contenir au maximum 50 carractères !";
    }
    if (!values.firstPassword) {
      errors.firstPassword = "Un mot de passe est requis !";
    }
    if (!values.secondPassword) {
      errors.secondPassword = "la confirmation du  mot de passe est requise !";
    } else if (values.secondPassword === values.firstPassword) {
      errors.secondPassword = "Les mots de passe doivent être identiques !";
    }
  };
  return (
    <section>
      <article>
        <h1>Créer un compte</h1>
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
        <p>{errors.email}</p>
        <label htmlFor="username">Pseudo:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={values.username}
          onChange={handleInputChange}
        />
        <p>{errors.username}</p>
        <label htmlFor="firstPassword">Mot de passe:</label>
        <input
          type="password"
          id="firstPassword"
          name="firstPassword"
          value={values.firstPassword}
          onChange={handleInputChange}
        />
        <p>{errors.firstPassword}</p>
        <label>Confirmer le mot de passe:</label>
        <input
          type="password"
          id="secondPassword"
          name="secondPassword"
          value={values.secondPassword}
          onChange={handleInputChange}
        />
        <p>{errors.secondPassword}</p>
        <button type="submit">Créer un compte</button>
        <p>
          <b>Déja inscrit ?</b>
          <button>
            <a href="http://localhost:8080/Login">Connexion</a>
          </button>
        </p>
      </form>
    </section>
  );
}

export default Register;
