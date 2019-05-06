const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {

	const controller = require('../controller/auth.controller');
	
	app.get('/api/auth/getAllUser', controller.getAllUser);
	
	app.delete('/api/auth/deleteUser/:profileId', controller.deleteUser);
 
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);

	app.patch('/api/auth/updateProfile/:profileId', controller.updateProfile);

	app.patch('/api/auth/updatePass/:profileId', [authJwt.verifyToken], controller.updatePass);
	
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);
	
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);
	
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}
