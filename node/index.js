// const http = require('http')
// const auth = require('basic-auth')
 
// // Create server
// const server = http.createServer(function (req, res) {
//   const credentials = auth(req)
 
//   if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
//     res.statusCode = 401
//     res.setHeader('WWW-Authenticate', 'Basic realm="example"')
//     res.end('Access denied')
//   } else {
//     res.end('Access granted')
//   }
// })
 
// // Listen
// server.listen(3000)



const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/users')
	.then(() => console.log('MongoDB has started ...'))
	.catch(e => console.log(e))


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: false}))


app.listen(3000);
app.post('/auth', function(request, response){
	console.log(request.body);
	response.send("<h2>Привет Express!</h2>")
})

