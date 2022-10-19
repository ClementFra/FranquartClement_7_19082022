import { useState } from "react";
import Axios from "interceptors/axios";
import {Navigate} from "react-router-dom";
function Register() {
  const initialValues={
    "email":"",
    "username":"",
    "firstPassword":"",
    "secondPassword":"",
  }
  const [values, setValues]= useState(initialValues);

  function handleInputChange(e){
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]:value
    })
  }
  function handleSubmit(e){
    e.preventDefault()
    const user={
      ...values,
      password:values.firstPassword
    }
    Axios.post("/auth/signup",user)
    .then(res => {
      Navigate("/Login")
    }) 
    .catch(error =>{
      alert("Profil non créer")
    })

  }
  return (
    <section>
      <article>
        <h1>Créer un compte</h1>
      </article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={values.email} onChange={handleInputChange}/>
        <label htmlFor="username">Pseudo:</label>
        <input type="text" id="username" name="username" value={values.username} onChange={handleInputChange}/>
        <label htmlFor="firstPassword">Mot de passe:</label>
        <input type="password" id="firstPassword" name="firstPassword" value={values.firstPassword} onChange={handleInputChange}/>
        <label >Confirmer le mot de passe:</label>
        <input type="password" id="secondPassword" name="secondPassword" value={values.secondPassword} onChange={handleInputChange}/>
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
