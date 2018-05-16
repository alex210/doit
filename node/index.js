const auth = require('basic-auth')
 
  // if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
  //   res.statusCode = 401;
  //   res.setHeader('WWW-Authenticate', 'Basic realm="example"');
  //   res.end('Access denied');
  // } else {
  //   res.end('Access granted');
  // }





const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const bd = require("./bd/bd");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.post('/auth', function(request, response){
// 	bd.makeUser(request.body.login, request.body.password);
// 	response.send(request.body);
// });



app.post('/auth', function(request, response){
  const credentials = auth(request);
	bd.findUser(credentials.name, credentials.pass).then(res => {
	  if (!credentials || !res) {
	  	bd.makeUser(request.body.name, request.body.login, request.body.password);
			response.send(true);
		} else {
			response.send(false);
	  }
	});
});

app.post('/check', function(request, response){
  const credentials = auth(request);
	bd.findUser(credentials.name, credentials.pass).then(res => {
	  if (!credentials || !res) {
			response.send(false);
		} else {
			response.send(true);
	  }
	});
});

app.post('/signin', function(request, response){
  const credentials = auth(request);
	bd.signUser(credentials.name, credentials.pass).then(res => {
	  if (!credentials || !res) {
			response.send(false);
		} else {
			response.send({"name":res});
	  }
	});
});

app.listen(3000);


/*const http = require('http')
const auth = require('basic-auth')
 
// Create server
const server = http.createServer(function (req, res) {
  const credentials = auth(req)
 
  if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    res.end('Access granted')
  }
})
 
// Listen
server.listen(3000)*/
