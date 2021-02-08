const express = require('express')
const rtObjetos = express.Router()
const daoObjetos = require('../dao/daoObjetos')
const Objeto = require('../models/Objeto')

rtObjetos.get('/nuevo', function (req, res) {
    res.render('objetos/formularioO')
})

rtObjetos.post('/guardar', (req, res) => {
    req.body.oFoto = `/img/objetos/${req.files.oFoto.name}`
    daoObjetos.guardar(req.body)
        .then(resp => {
            let foto = req.files.oFoto
            foto.mv(`./public/img/objetos/${foto.name}`, err => {
                if (err) return res.status(500).send({ message: err })
                res.render('objetos/formularioO', { message: "Objetos guardado correctamente. Revise su email para activar su cuenta." })
            })
        })

})

rtObjetos.get('/listado', async function (req, res) {
    let misObjetos = await daoObjetos.listar()
    console.log(misObjetos)
    res.render('objetos/listado', { objetosPerdidos: misObjetos })
})

rtObjetos.post('/filtrar', (req, res) => {
    console.log(req.body)
    daoObjetos.listarPorTipo(req.body.oTipo)
        .then(listado =>
            res.json(listado)
        )
})

rtObjetos.get('/objetos/listar:filtrar', async function (req, res) {
    let oTipo = req.params.oTipo
    let misObjetos = await daoObjetos.listarPorTipo(oTipo)
    res.render('objetos/listado', { objetosPerdidos: misObjetos })
})

rtObjetos.post('/modificar', function (req, res) {
    if (req.files != null) {
        let m = req.files.oFoto
        m.mv(`./public/img/objetos/${m.name}`, err => {
            if(err) console.log(err)
        })
        req.body.oFoto = req.files.oFoto.name
    }
    daoObjetos.modificar(req.body)
        .then(resp => res.render('/objetos/modificar', { mensaje: resp }))
})

module.exports = rtObjetos