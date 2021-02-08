const express = require('express')
const app = express()
var exphbs  = require('express-handlebars')
const rtMain = require('./routes/rtMain')
const rtUsuarios = require('./routes/rtUsuarios')
const rtObjetos = require('./routes/rtObjetos')
const conexion = require('./conexion')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const bodyParser = require('body-parser')


//configuración del motor de plantillas handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(fileUpload())
app.use(express.json())
app.use(session({ 
    secret: 'miclavesecreta',
    resave: false,
    saveUninitialized: true
}))

let rutasPrivadas=[
    '/objetos/guardar',
    '/objetos/nuevo',
    '/objetos/listado'
    ]
    app.use((req,res,next)=>{
        if(req.session.autenticado){ 
         res.locals.session=req.session
          next()
        }else{
            if(rutasPrivadas.indexOf(req.url)!=-1){
                res.render('acceso-denegado')
            }else next()
        }
      })
  
//enrutador principal
app.use('/',rtMain)
app.use('/usuarios',rtUsuarios)
app.use('/objetos',rtObjetos)

conexion.on('error', console.error.bind(console,'error de conexion'))
conexion.once('open',()=> console.log("conexion con la bd"))

//arrancamos el servidor:
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})