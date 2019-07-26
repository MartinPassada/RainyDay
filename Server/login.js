/**
 * Valida usuario y clave
 * 
 * @param {string} user Usuario
 * @param {string} password Clave
 */
function validarUsuario(user, password) {

    if (user == "admin" && password == "admin") {
      return true;
    } else {
      return false
    }
  
}

module.exports.validarUsuario = validarUsuario;