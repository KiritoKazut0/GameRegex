

export const password = (password) => {
    if (!password) {
        return { isValid: false, message: "La contraseña no puede estar vacía" };
    }
    if (password.length < 4) {
        return { isValid: false, message: "La contraseña debe tener al menos 4 caracteres" };
    }
    return { isValid: true, message: "" }; 
};

export const email = (correo) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correo) {
        return { isValid: false, message: "El campo no puede estar vacío" };
    }
    if (!regex.test(correo)) {
        return { isValid: false, message: "Ingrese un correo electrónico válido" };
    }
    return { isValid: true, message: "" }; 
};






