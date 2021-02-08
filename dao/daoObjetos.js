const Objeto = require('../models/Objeto')

const daoObjetos = {}

daoObjetos.guardar = function save(objeto) {
  return new Promise((resolved, reject) => {
    let o = new Objeto(objeto)
    if (o.errores.length <= 0) o.save()
    resolved(o)
  })
}

daoObjetos.listar = function find() {
  return new Promise((resolved, reject) => {
    resolved(Objeto.find().lean())
  })
}

daoObjetos.listarPorTipo = function findByTitle(oTipo) {
  return new Promise((resolved, reject) => {
    resolved(Objeto.find({ tipo: oTipo }).lean())
  })
}

daoObjetos.modificar = function update(objeto) {
  return new Promise((resolved)=> {
    let o = new objeto(objeto)
    if (o.mensaje.length <= 0) o.save()
    objeto.findByIdAndUpdate(
      objeto._id,
      objeto
    ).then(err => {
      if (err) resolved(err)
    resolved('Actualizado correctamente')
    })
  })
}
module.exports = daoObjetos