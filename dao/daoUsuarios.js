const { Router } = require('express')
var Usuario = require('../models/Usuario')
const mailer = require('../modules/mailer')

const daoUsuarios = {}


daoUsuarios.guardar = function save(usuario) {
  return new Promise((resolved) => {
    let u = new Usuario(usuario)
    u.save()
      .then(() => {
        mailer.send(u.uEmail)
        resolved(u)
      })
      .catch(err => resolved(err))
  })
}

daoUsuarios.getUsuarioByEmail = function getUsuarioByEmail(email) {
  return new Promise((resolved) => {
    resolved(Usuario.findOne({ uEmail: email }))
  })

}

daoUsuarios.sesion = function sesion(credenciales) {
  return new Promise((resolved) => {
    daoUsuarios.getUsuarioByEmail(credenciales.uEmail)
      .then(async usuario => {
        if (usuario == null)
          resolved(false)
        else{
          let respuesta = await usuario.comprobarPwd(credenciales.uPassword)
        resolved(respuesta)
        }
      })
  })
}

module.exports = daoUsuarios