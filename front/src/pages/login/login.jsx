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
import "./login.css";

/*****************************************************************
 *****************       IMPORT INTERCEPTOR    *******************
 *****************************************************************/
import Axios from "interceptors/axios";
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
      Axios.post("/auth/login", user)
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
    <main className="login_page_main">
      <section className="login_page_section">
        <h1 className="login_page_section_h1">Vous connecter</h1>
        <form className="login_page_section_form" onSubmit={handleSubmit}>
          <label className="login_page_section_form_label" htmlFor="email">
            Email
          </label>
          <input
            className="login_page_section_form__label_input"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
          <p className="login_page_section_form_invalid">{errors.email}</p>
          <label className="login_page_section_form_label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="login_page_section_form__label_input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <p className="login_page_section_form_invalid">{errors.password}</p>
          <button className="login_page_section_form_button" type="submit">
            connexion
          </button>
        </form>
        <p id="log-error" className="login_page_section_form_invalid"></p>
        <p className="login_page_link">Pas de compte ?</p>
        <button className="login_page_section_button_register">
          <Link to="/Register" className="login_page_button_register_link">
            S'enregistrer
          </Link>
        </button>
      </section>
    </main>
  );
}

export default Login;
