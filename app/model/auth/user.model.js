module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		role: {
			type: Sequelize.STRING
		},
		company: {
			type: Sequelize.STRING
		},
		departement: {
			type: Sequelize.STRING
		},
		monitor: {
			type: Sequelize.BOOLEAN
		},
		control: {
			type: Sequelize.BOOLEAN
		},
		config: {
			type: Sequelize.BOOLEAN
		},
		email: {
		  type: Sequelize.STRING
	  },
	},
	{
		timestamps: false,
	});

	return User;
}