/*****************************************************************
 *****************       IMPORT VALIDATION FORM   ****************
 *****************************************************************/
import { checkLogin } from "helpers/validationLogin";

/*****************************************************************
 *****************       IMPORT REACT     ************************
 *****************************************************************/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

/*****************************************************************
 *****************       IMPORT STYLE    *************************
 *****************************************************************/
import "../../components/sass/login.scss";

/*****************************************************************
 *****************       IMPORT INTERCEPTOR    *******************
 *****************************************************************/
import axiosPublic from "interceptors/axiosPublic";
import { setUser } from "reducers/userReducer";

function Login() {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setFormError] = useState({});
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setFormError({
      ...errors,
      [name]: "",
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      ...values,
    };
    let isValid = validate();
    if (isValid) {
      axiosPublic
        .post("/auth/login", user)
        .then((res) => {
          dispatch(setUser(res.data));
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      document.querySelector("#log-error").innerHTML =
        "La connexion comprend une erreur.";
    }
  }

  function validate() {
    setFormError(checkLogin(values));
    return Object.keys(errors).length < 1;
  }

  return (
    <main>
      <section className="login">
        <h1 className="login__title">Vous connecter</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            className="login__input"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
          <p className="invalid__text">{errors.email}</p>
          <label className="login__label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="login__input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <p className="invalid__text">{errors.password}</p>
          <button className="login__button" type="submit">
            connexion
          </button>
        </form>
        <p id="log-error" className="invalid__text"></p>
      </section>
      <p className="login__text">
        Pas de compte ?{" "}
        <Link to="/Register" className="link__text">
          Enregistrez-vous !
        </Link>{" "}
      </p>
    </main>
  );
}

export default Login;
