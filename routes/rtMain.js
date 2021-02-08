const express = require('express')
const rtMain = express.Router()


rtMain.get('/', function (req, res) {
    res.render('home')
})

rtMain.get('/acceso-denegado', function (req, res) {
    res.render('acceso-denegado')
})

rtMain.get('/objetos/modificar', function (req, res) {
    res.render('modificar')
})

module.exports = rtMain