function validationForm(values) {
  const errors = {};
  const regexUsername = new RegExp(
    /^(?=.$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/
  );
  const regexEmail = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-][a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-][a-zA-Z0-9])?)*$/
  );
  const regexPwd = new RegExp(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s])$/
  );
  // Errors email

  if (!regexEmail.test(values.email)) {
    errors.email = "Le format de votre email est invalide !";
  }

  // Errors username

  if (!regexUsername.test(values.username)) {
    errors.username =
      "Le format de votre pseudo doit contenir 3 carractères minimum et 50 carractères maximum !";
  }
  // Errors firstpassword

  if (!regexPwd.test(values.firstPassword)) {
    errors.firstPassword =
      "Le format de votre mot de passe doit contenir 8 carractères avec une Majuscule, Minuscule, carractères alphanumérique et un carractères spécial !";
  }

  // Errors secondpassword

  if (values.secondPassword !== values.firstPassword) {
    errors.secondPassword = "Les mots de passe doivent être identiques !";
  }
  return errors;
}
export default validationForm;
