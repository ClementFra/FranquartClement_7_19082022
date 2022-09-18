<section>
  <article>
    <h1>Créer un compte </h1>
  </article>
  <form onSubmit={handleSubmit}>
    <label>
      Pseudo:
      <span>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
    <p>
      <FontAwesomeIcon icon={faInfoCircle} />
      4 à 20 caractères,
      <br /> commençant par une lettre.
      <br /> Seul les lettres, les chiffres et les caractères - et _ sont
      autorisés.
    </p>
    <label>
      Courriel:
      <span>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
    <input />
    <p>
      <FontAwesomeIcon icon={faInfoCircle} />
      Une adresse email valide doit être saisie.
    </p>

    <label>
      Mot de passe:
      <span>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
    <p>
      <FontAwesomeIcon icon={faInfoCircle} />
      8 à 24 caractères,
      <br /> Doit contenir au moins une lettre minuscule, une lettre majuscule,
      un chiffre et un caractère spécial. caractères autorisés:
      <span aria-label="exclamation mark" role="img">
        !
      </span>
      <span aria-label="asterisk" role="img">
        *
      </span>
      <span aria-label="percent sign" role="img">
        %
      </span>
      <span aria-label="hyphen" role="img">
        -
      </span>
      <span aria-label="underscore" role="img">
        _
      </span>
      <span aria-label="equal sign" role="img">
        =
      </span>
      <span aria-label="hashtag" role="img">
        #
      </span>
      <span aria-label="at sign" role="img">
        @
      </span>
    </p>
    <label>
      Confirmer le mot de passe:
      <span>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
    <input />
    <p>
      <FontAwesomeIcon icon={faInfoCircle} />
      Doit être identique au mot de passe.
    </p>
    <button>Créer un compte</button>
    <p>
      <b>Déja inscrit ?</b>
      <br />
      <button>Se connecter</button>
    </p>
  </form>
</section>;
