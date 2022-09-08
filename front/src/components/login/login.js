import "./login.css";
function Login() {
    return (
        <section>
          <article>
            <h1>Vous connecter</h1>
          </article>
          <form>
            <label>Email</label>
            <label>Mot de passe</label>
          <button>connexion</button>
          <p>
            Pas de compte ?<br />
            <button><a href="http://localhost:8080/Register">S'enregister</a></button>
          </p>
          </form>
        </section>
    )
}

export default Login