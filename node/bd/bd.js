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

exports.makeUser = makeUser;