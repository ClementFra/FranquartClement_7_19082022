import { checkEmpty, checkLength } from "./validationUtils";

export function checkRegister(values) {
  const errors = {};
  values.foreach((values, index) => {
    if (!checkEmpty(values)) {
      errors[index] = "ce champ est vide";
    }
  });
}
export function isTheSame(values) {
  if (values.firstPassword !== values.secondPassword) {
    errors.secondPassword= "Les mots de passe doivent être identiques !";
  }
}
export function checkEmail(values) {
  if (!new RegExp(/\S+@\S+\.\S+/).test(values.email)) {
    errors.email= "Format email incorrecte !";
  }
}
export function checkPassword(values) {
  if (
    !new RegExp(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
    ).test(values.firstPassword)
  ) {
    errors.firstPassword= "Le format de votre mot de passe doit contenir 8 carractères avec une Majuscule, Minuscule, carractères alphanumérique et un carractères spécial !";
  }
}
export function checkRegisterlength(){
  if(!checkLength(username)){
    errors.userName ="Votre nom d'utilisateur doit être compris entre 3 et 50 carractères"
  }
}
//   const regexUsername = new RegExp(
//     /^(?=.$)(?![.-])(?!.*[.]{2})[a-zA-Z0-9.-]+(?<![.])$/
//   );
//   const regexEmail = new RegExp(
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-][a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-][a-zA-Z0-9])?)*$/
//   );
//   const regexPwd = new RegExp(
//     /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s])$/
//   );
//   // Errors email

//   if (!regexEmail.test(values.email)) {
//     errors.email = "Le format de votre email est invalide !";
//   }

//   // Errors username

//   if (!regexUsername.test(values.username)) {
//     errors.username =
//       "Le format de votre pseudo doit contenir 3 carractères minimum et 50 carractères maximum !";
//   }
//   // Errors firstpassword

//   if (!regexPwd.test(values.firstPassword)) {
//     errors.firstPassword =
//       "Le format de votre mot de passe doit contenir 8 carractères avec une Majuscule, Minuscule, carractères alphanumérique et un carractères spécial !";
//   }

//   // Errors secondpassword

//   if (values.secondPassword !== values.firstPassword) {
//     errors.secondPassword = "Les mots de passe doivent être identiques !";
//   }
//   return errors;
// }
