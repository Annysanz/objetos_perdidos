const mongoose = require('mongoose')
const {Model, Schema} = mongoose

const schemaObjeto= new Schema({
    uNombre:{type:String, require: true},
    uTelefono:{type:String, require: true},
    oTipo:{type:String, require: true},
    oDescripcion:{type:String, require: true},
    oLugar:{type:String, require: true},
    oDate:{type:String, require: true},
    oFoto:{type:String, default:`../public/img/objetos/default.jpg`}
})

class Objeto extends Model{
    
    errores=[]

    get errores(){
        let errores=[]
        if(this.uNombre=="") errores.push({error:"Nombre vacio"})
        if(this.uTelefono=="") errores.push({error:"teléfono vacio"})
        return errores
    }
}

schemaObjeto.loadClass(Objeto)
module.exports= mongoose.model('objeto',schemaObjeto)