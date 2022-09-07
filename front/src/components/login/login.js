import "./login.css";
function Login() {
    return (
        <section>
          <article className="display-title-form">
            <h1>Vous connecter</h1>
          </article>
          <form>
            <label htmlFor="email">Email</label>
            <label htmlFor="password">Mot de passe</label>
          <button>connexion</button>
          <p>
            Pas de compte ?<br />
            <button>S'enregister</button>
          </p>
          </form>
        </section>
    )
}

export default Login