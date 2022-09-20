function Register() {
  return (
    <section>
      <article>
        <h1>Créer un compte </h1>
      </article>
      <form>
        <label>Pseudo:</label>
        <input></input>
        <label>Email:</label>
        <input></input>
        <label>Mot de passe:</label>
        <input></input>
        <label>Confirmer le mot de passe:</label>
        <input></input>
        <button>Créer un compte</button>
        <p>
          <b>Déja inscrit ?</b>
          <button>
            <a href="http://localhost:8080/Login">Se connecter</a>
          </button>
        </p>
      </form>
    </section>
  );
}

export default Register;
