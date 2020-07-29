/* Reglas de validacion para el inicio de sesion de usuarios */


export default function userValidation(values) {

    let errors = {};

    if (!values.password.length === 10) {
        errors.password = "La contraseña debe ser 10 caracteres exactamente, solo numeros";
        //como es sistema de administrado internamente, se define la contraseña del usuario de 10 digitos, solo numeros 
    }
    return errors;
    
}