import { useForm } from "react-hook-form";
import React, { useState } from "react";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defautValues: {
      email: "",
      username: "",
      firstPassword: "",
      secondPassword: "",
    },
  });
  const [setUserName] = useState("");
  const [setEmail] = useState("");
  const [setFisrtPassword] = useState("");
  const [setSecondPassword] = useState("");
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section>
      <article>
        <h1>Créer un compte</h1>
      </article>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Votre email"
          onChange={(e) => setEmail(e.target.value)}
          {...register("email", {
            required: "Vous devez entrer un email valide",
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label>Pseudo:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Votre Pseudo"
          onChange={(e) => setUserName(e.target.value)}
          {...register("username", {
            required: "Vous devez entrer un pseudo valide",
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
        <label>Mot de passe:</label>
        <input
          type="password"
          id="firstPassword"
          name="firstPassword"
          placeholder="Veuillez définir un mot de passe"
          onChange={(e) => setFisrtPassword(e.target.value)}
          {...register("firstPassword", {
            required: "Vous devez entrer un mot de passe valide",
          })}
        />
        {errors.firstPassword && <span>{errors.firstPassword.message}</span>}
        <label>Confirmer le mot de passe:</label>
        <input
          type="password"
          id="secondPassword"
          name="secondPassword"
          placeholder="Veuillez confirmer votre mot de passe"
          onChange={(e) => setSecondPassword(e.target.value)}
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
