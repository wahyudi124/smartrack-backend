const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
// io model
db.io_profile = require('../model/io/io_profile.model.js')(sequelize,Sequelize);
db.io_latest = require('../model/io/io_latest.model.js')(sequelize,Sequelize);
db.io_timeseries = require('../model/io/io_timeseries.model.js')(sequelize,Sequelize);

//io relation
db.io_profile.hasMany(db.io_latest,{foreignKey: 'id_profile', sourceKey: 'id'});
db.io_latest.belongsTo(db.io_profile,{foreignKey: 'id_profile', targetKey: 'id'});

// sensor model
db.sensor_profile = require('../model/sensor/sensor_profile.model.js')(sequelize,Sequelize)
db.sensor_latest = require('../model/sensor/sensor_latest.model.js')(sequelize,Sequelize)
db.sensor_library = require('../model/sensor/sensor_library.model.js')(sequelize,Sequelize)
db.sensor_timeseries = require('../model/sensor/sensor_timeseries.model.js')(sequelize,Sequelize)
db.sensor_profile.hasMany(db.sensor_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.sensor_latest.belongsTo(db.sensor_profile, {foreignKey:'id_profile',targetKey: 'id'});

// pdu model
//db.pdu_profile = require('../model/pdu/pdu_profile.model.js')(sequelize,Sequelize);
//db.pdu_latest = require('../model/pdu/pdu_latest.model.js')(sequelize,Sequelize);

//rectifier model 
db.rectifier_profile = require('../model/rectifier/rectifier_profile.model.js')(sequelize,Sequelize)
db.rectifier_latest  = require('../model/rectifier/rectifier_latest.model.js') (sequelize,Sequelize)
db.rectifier_library = require('../model/rectifier/rectifier_library.model.js')(sequelize,Sequelize)
db.rectifier_timeseries = require('../model/rectifier/rectifier_timeseries.model')(sequelize,Sequelize)
db.rectifier_protocol = require('../model/rectifier/rectifier_protocol.model.js')(sequelize,Sequelize)
db.rectifier_profile.hasMany(db.rectifier_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.rectifier_latest.belongsTo(db.rectifier_profile, {foreignKey:'id_profile',targetKey: 'id'});
db.rectifier_profile.hasMany(db.rectifier_timeseries, {foreignKey:'id_profile',sourceKey:'id'});
db.rectifier_timeseries.belongsTo(db.rectifier_profile, {foreignKey:'id_profile',targetKey: 'id'})
db.rectifier_profile.hasMany(db.rectifier_protocol,{foreignKey:'id_profile',sourceKey:'id'})
db.rectifier_protocol.belongsTo(db.rectifier_profile, {foreignKey:'id_profile',targetKey: 'id'})




//Auth Model

db.user = require('../model/auth/user.model.js')(sequelize, Sequelize);
db.role = require('../model/auth/role.model.js')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});


module.exports = db;
