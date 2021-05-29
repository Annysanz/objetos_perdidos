const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')
// const beautifyUnique = require('mongoose-beautiful-unique-validatión')

const schemaUsuario = new Schema({
    uNombre: { type: String},
    uEmail: {
        type: String,
        require: [true, 'El Email está duplicado'],
        index: true,
        unique: 'Email está duplicado'
    },
    uPassword: { type: String, require: [true, 'Password es Obligatorio'] },
    activo: { type: Boolean, default: false }
})

class Usuario {

    get errores() {
        let errores = []
        if (this.uNombre == "") errores.push({ error: "Nombre esta vacío" })
        if (this.uEmail == "") errores.push({ error: "Email esta vacío" })
        if (this.uPassword == "") errores.push({ error: "Password esta vacío" })
        return errores
    }

    comprobarPwd(uPassword) {
        return bcrypt.compare(uPassword, this.uPassword)
            .then(res => { return res })
    }
}

schemaUsuario.pre('save', function (next) {
    bcrypt.hash(this.uPassword, 10)
        .then(hash => {
            this.uPassword = hash
            next()
        })
})

// schemaUsuario.plugin(beautifyUnique)
schemaUsuario.loadClass(Usuario)
module.exports = mongoose.model('usuario', schemaUsuario)