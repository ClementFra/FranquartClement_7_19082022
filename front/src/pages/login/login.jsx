import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "interceptors/axios";
import "./login.css";
//import Auth from "../../contexts/auth";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  //const { isAuthenticated, setIsAuthenticated } = useContext(Auth);
  const navigate = useNavigate();
  function handleChange(currentTarget) {
    const { name, value } = currentTarget;

    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    Axios.post("/auth/login", user)
      .then((res) => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section>
      <h1>Vous connecter</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <button type="submit">connexion</button>
      </form>
      <p>Pas de compte ?</p>
      <button className="button-connexion">
        <Link to="/Register">S'enregistrer</Link>
      </button>
    </section>
  );
}

export default Login;
