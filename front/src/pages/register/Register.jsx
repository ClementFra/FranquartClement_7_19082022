import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// class Field extends React.Component{
//   render(){
//     const {name, value,onChange} = this.props
//     return <div className= "form-group">
//       <label htmlFor={name}></label>
//       <input type="text" value={value} onChange={onChange} id={email} name={name} classname="form-control"/>
//      </div>
//   }
// }
function Register() {
  // Constantes

  const baseUrl = "http://localhost:8080/api/auth/signup";

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  //States

  const [values, setValues] = useState({
    email: "",
    username: "",
    firstPassword: "",
    secondPassword: "",
  });

  //Fonction

  const toggleSubmit = (e) => {
    e.preventDefault();
    const body = {
      username: values.username,
      email: values.email,
      firstPassword: values.firstPassword,
      secondPassword: values.secondPassword,
    };
    axios.post(baseUrl, body).then((res) => {
      alert("votre profile a été créé");
      Navigate("/Login");
    });
  };

  const handleChanges = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <section>
      <article>
        <h1>Créer un compte</h1>
      </article>
      <form onSubmit={toggleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Votre email"
          onChange={handleChanges("email")}
          {...register("email", {
            required: "Vous devez entrer un email valide",
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="username">Pseudo:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Votre Pseudo"
          onChange={handleChanges("username")}
          {...register("username", {
            required: "Vous devez entrer un pseudo valide",
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        <label htmlFor="firstPassword">Mot de passe:</label>
        <input
          type="password"
          id="firstPassword"
          name="firstPassword"
          placeholder="Veuillez définir un mot de passe"
          onChange={handleChanges("firstPassword")}
          {...register("firstPassword", {
            required: "Vous devez entrer un mot de passe valide",
          })}
        />
        {errors.firstPassword && <span>{errors.firstPassword.message}</span>}
        <label htmlFor="secondPassword">Confirmer le mot de passe:</label>
        <input
          type="password"
          id="secondPassword"
          name="secondPassword"
          placeholder="Veuillez confirmer votre mot de passe"
          onChange={handleChanges("secondPassword")}
          {...register("secondPassword", {
            required: "Vous devez entrer un mot de passe identique",
          })}
        />
        {errors.secondPassword && <span>{errors.secondPassword.message}</span>}
        <button>Créer un compte</button>
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
