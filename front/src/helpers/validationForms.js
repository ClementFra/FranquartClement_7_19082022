import { isTheSame } from "./validationUtils";
import validator from 'validator';


export function checkRegister(values) {
  let errors = {};
  for(const index in values){
    const value = values[index];
    if (validator.isEmpty(value)) {
      errors[index] = "Ce champ ne peut pas être vide.";
    }
  }
  if(!validator.isEmail(values.email)){
    errors["email"] ="L'email est invalide."
  }
  if(!isTheSame(values.firstPassword, values.secondPassword)){
    errors["secondPassword"]="Les deux mots de passe doivent être identiques !"
  }
  if(!validator.isStrongPassword(values.firstPassword,{minlength:8,minLowerCase:1,minUppercase: 1, minNumbers: 1, minSymbols: 1})){
    errors["firstPassword"]="Votre mot de passe doit contenir 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre."
  }
  if(!validator.isLength(values.username,{min:3,max:50})){
    errors["username"]="Votre nom d'utilisateur doit être compris entre 3 et 50 carractères."
  }
  return errors;
}


