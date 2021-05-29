const nodemailer = require("nodemailer");
const fs = require('fs')

const mailer={}

mailer.send = async function send(destinatario) {
  // crear un objeto transportador reutilizable utilizando el transporte SMTP predeterminado
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'proyectoyana@gmail.com', // Usuario etéreo generado
      pass: 'Fullstack#01', // contraseña etérea generada
    },
  })

  // send mail with defined transport object
  // mailer.getTemplate(template)
  //   .then(datos=>
      let info = await transporter.sendMail({
            from: '"Fred Foo" <foo@example.com>', // dirección del remitente
            to: destinatario, // lista de receptores
            subject: "Registro usuario nuevo", // Línea de asunto
            text: "Estos son sus datos", // cuerpo de texto sin formato
            html: "<h1>Puedes activar tu cuenta</h1>"
          })
  //  )
  console.log(info)
}

// transporter.sendMail(mailOptions, (error, info)=>{
//   if(error){
//     resizeBy.status(500).send(error.mensaje)
//   }else{
//     console.log("Email enviado.")
//     resizeBy.status(200).json(req.body)
//   }
// })
module.exports=mailer