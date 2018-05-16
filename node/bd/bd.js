const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/users')
	.then(() => console.log('MongoDB has started ...'))
	.catch(e => console.log(e));

require('./user.model');

const ModelUser = mongoose.model('users');


function makeUser(name, login, password){
	const user = new ModelUser({
		name: name,
		login: login,
		password: password
	});

	user.save()
		.then(data => {
			console.log(data);
		})
		.catch(e => console.log(e));
}

function findUser(login, password){
	return new Promise(function(resolve){
		ModelUser.find({login: login, password: password}).then(user => {
			if(user.length > 0){
				resolve(true);
			}else{
				resolve(false);
			};
		});
	});
}

function signUser(login, password){
	return new Promise(function(resolve){
		ModelUser.find({login: login, password: password}).then(user => {
			if(user.length > 0){
				resolve(user[0].name);
			}else{
				resolve(false);
			};
		});
	});
}

function addMarkers(login, password, markers){
	return new Promise(function(resolve){
		ModelUser.update({login: login, password: password}, {markers: markers}).then(result => {
			resolve(result);
		});
	});
}

function getMarker(login, password){
	return new Promise(function(resolve){
		ModelUser.find({login: login, password: password}).then(user => {
			if(user.length > 0){
				resolve(user[0].markers);
			}else{
				resolve(false);
			};
		});
	});
}


exports.makeUser = makeUser;
exports.findUser = findUser;
exports.signUser = signUser;
exports.addMarkers = addMarkers;
exports.getMarker = getMarker;