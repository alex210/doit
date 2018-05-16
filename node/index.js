const auth = require('basic-auth');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bd = require("./bd/bd");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.post('/markers', function(request, response){
  const credentials = auth(request);
  bd.findUser(credentials.name, credentials.pass).then(res => {
  	if (!credentials || !res) {
  		response.send(false);
		} else {
			bd.addMarkers(credentials.name, credentials.pass, request.body).then(res => {
				response.send(res);
			});
		}
	});
});

app.get('/get-markers', function(request, response){
  const credentials = auth(request);
  bd.getMarker(credentials.name, credentials.pass).then(res => {
  	if (!credentials || !res) {
  		response.send(false);
		} else {
			response.send({"markers":res});
		}
	});
});

app.listen(3000);
