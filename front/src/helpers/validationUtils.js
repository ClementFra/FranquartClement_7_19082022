function validationUtils(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Un email est requis !";
  }


  if (!values.username) {
    errors.username = "Un pseudo est requis !";
  }else if (values.username.lenght < 3 && values.username.lenght > 50){
    errors.username= " Le format de votre pseudo doit contenir 3 carractères minimum et 50 carractères maximum !";
  } 


  if (!values.firstPassword) {
    errors.firstPassword = "Un mot de passe est requis !";
  }else if(values.password < 8){
    errors.firstPassword= "votre mot de passe doit contenir 8 carractères minimum !"
  }

  if (!values.secondPassword) {
    errors.secondPassword = "la confirmation du  mot de passe est requise !";
  }
  return errors;
}
export default validationUtils;
