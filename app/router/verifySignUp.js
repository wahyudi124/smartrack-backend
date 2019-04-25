// const config = require('../config/config.js');
const  config = require('../config/config');
// const db = require('../config/db.config.js');
const db = require('../config/db.config');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;

checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> Check Username is already in use
	User.findOne({
		where: {
			username: req.body.users.username
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Fail -> Username is already taken!");
			return;
		}
		
		// -> Check Email is already in use
		User.findOne({ 
			where: {
				email: req.body.users.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Fail -> Email is already in use!");
				return;
			}
				
			next();
		});
	});
}

checkRolesExisted = (req, res, next) => {	
	for(let i=0; i<req.body.users.role.length; i++){
		if(!ROLEs.includes(req.body.users.role[i].toUpperCase())){
			res.status(400).send("Fail -> Does NOT exist Role = " + req.body.users.role[i]);
			return;
		}
	}
	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;