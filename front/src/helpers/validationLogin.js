import validator from 'validator';

export function checkLogin(values) {
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
    return errors;
}