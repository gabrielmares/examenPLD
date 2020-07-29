/**
 funcion para validar el registro de usuarios en el sistema, no valida el email
 no existe registro externo, los usuarios del sistema son registrados por el administrador, por lo tanto ya conoce el Email del usuario
 */


export default function SignInValidation(values) {
    let errors = {};
    
    if (!values.nombre) {
        errors.nombre = "Todos los campos son obligatorios";
    }
    if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { 
        errors.email ="Email no Valido"
    }
    if (values.password.length <6) {
        errors.password = "La longitud de la contraseña debe ser 10 caracteres exactamente, solo numeros";
        //como es sistema de administrado internamente, se define la contraseña del usuario de 10 digitos, solo numeros
    }
    return errors;
};