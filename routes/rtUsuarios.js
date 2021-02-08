const express = require('express')
const rtUsuarios = express.Router()
const daoUsuarios = require('../dao/daoUsuarios')

rtUsuarios.get('/nuevo', function (req, res) {
    res.render('usuarios/formularioU')
})

rtUsuarios.post('/guardar', (req, res) => {
    daoUsuarios.guardar(req.body)
        .then(resp => {
            res.render('usuarios/formularioS', { mensaje: resp, body: req.body })
        })
})


rtUsuarios.get('/sesion', function (req, res) {
    res.render('usuarios/formularioS')
})

rtUsuarios.post('/sesion', function (req, res) {
    console.log(req.body)
    daoUsuarios.sesion(req.body)
        .then(respuesta => {
            if (respuesta){
                req.session.autenticado=true
                req.session.usuario=req.body.uEmail
                res.redirect('/objetos/nuevo')
            }else
                res.render('usuarios/formularioS', { body: req.body, mensaje: "Password o usuario incorrecto" })
        })
        .catch(err => {
            res.render('objetos/listado', { body: req.body, mensaje: "Algo ha ido mal" })
        })
})

rtUsuarios.get('/sesion', (req, res) => {
    req.session.destroy()
    res.render('/')
})

rtUsuarios.post("/send-email", (req, res) => {
    console.log("Email enviado")
})

module.exports = rtUsuarios