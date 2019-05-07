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


//ups model
db.ups_profile = require('../model/ups/ups_profile.model.js')(sequelize,Sequelize)
db.ups_latest  = require('../model/ups/ups_latest.model.js') (sequelize,Sequelize)
db.ups_library = require('../model/ups/ups_library.model.js')(sequelize,Sequelize)
db.ups_timeseries = require('../model/ups/ups_timeseries.model')(sequelize,Sequelize)
db.ups_protocol = require('../model/ups/ups_protocol.model.js')(sequelize,Sequelize)
db.ups_profile.hasMany(db.ups_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.ups_latest.belongsTo(db.ups_profile, {foreignKey:'id_profile',targetKey: 'id'});
db.ups_profile.hasMany(db.ups_timeseries, {foreignKey:'id_profile',sourceKey:'id'});
db.ups_timeseries.belongsTo(db.ups_profile, {foreignKey:'id_profile',targetKey: 'id'})
db.ups_profile.hasMany(db.ups_protocol,{foreignKey:'id_profile',sourceKey:'id'})
db.ups_protocol.belongsTo(db.ups_profile, {foreignKey:'id_profile',targetKey: 'id'})


//battery model
db.battery_profile = require('../model/battery/battery_profile.model.js')(sequelize,Sequelize)
db.battery_latest  = require('../model/battery/battery_latest.model.js') (sequelize,Sequelize)
db.battery_library = require('../model/battery/battery_library.model.js')(sequelize,Sequelize)
db.battery_timeseries = require('../model/battery/battery_timeseries.model')(sequelize,Sequelize)
db.battery_protocol = require('../model/battery/battery_protocol.model.js')(sequelize,Sequelize)
db.battery_profile.hasMany(db.battery_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.battery_latest.belongsTo(db.battery_profile, {foreignKey:'id_profile',targetKey: 'id'});
db.battery_profile.hasMany(db.battery_timeseries, {foreignKey:'id_profile',sourceKey:'id'});
db.battery_timeseries.belongsTo(db.battery_profile, {foreignKey:'id_profile',targetKey: 'id'})
db.battery_profile.hasMany(db.battery_protocol,{foreignKey:'id_profile',sourceKey:'id'})
db.battery_protocol.belongsTo(db.battery_profile, {foreignKey:'id_profile',targetKey: 'id'})


//aircond model
db.aircond_profile = require('../model/aircond/aircond_profile.model.js')(sequelize,Sequelize)
db.aircond_latest  = require('../model/aircond/aircond_latest.model.js') (sequelize,Sequelize)
db.aircond_library = require('../model/aircond/aircond_library.model.js')(sequelize,Sequelize)
db.aircond_timeseries = require('../model/aircond/aircond_timeseries.model')(sequelize,Sequelize)
db.aircond_protocol = require('../model/aircond/aircond_protocol.model.js')(sequelize,Sequelize)
db.aircond_profile.hasMany(db.aircond_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.aircond_latest.belongsTo(db.aircond_profile, {foreignKey:'id_profile',targetKey: 'id'});
db.aircond_profile.hasMany(db.aircond_timeseries, {foreignKey:'id_profile',sourceKey:'id'});
db.aircond_timeseries.belongsTo(db.aircond_profile, {foreignKey:'id_profile',targetKey: 'id'})
db.aircond_profile.hasMany(db.aircond_protocol,{foreignKey:'id_profile',sourceKey:'id'})
db.aircond_protocol.belongsTo(db.aircond_profile, {foreignKey:'id_profile',targetKey: 'id'})

//aircond model
db.pdu_profile = require('../model/pdu/pdu_profile.model.js')(sequelize,Sequelize)
db.pdu_latest  = require('../model/pdu/pdu_latest.model.js') (sequelize,Sequelize)
db.pdu_library = require('../model/pdu/pdu_library.model.js')(sequelize,Sequelize)
db.pdu_timeseries = require('../model/pdu/pdu_timeseries.model')(sequelize,Sequelize)
db.pdu_protocol = require('../model/pdu/pdu_protocol.model.js')(sequelize,Sequelize)
db.pdu_profile.hasMany(db.pdu_latest, {foreignKey:'id_profile',sourceKey:'id'});
db.pdu_latest.belongsTo(db.pdu_profile, {foreignKey:'id_profile',targetKey: 'id'});
db.pdu_profile.hasMany(db.pdu_timeseries, {foreignKey:'id_profile',sourceKey:'id'});
db.pdu_timeseries.belongsTo(db.pdu_profile, {foreignKey:'id_profile',targetKey: 'id'})
db.pdu_profile.hasMany(db.pdu_protocol,{foreignKey:'id_profile',sourceKey:'id'})
db.pdu_protocol.belongsTo(db.pdu_profile, {foreignKey:'id_profile',targetKey: 'id'})


//Auth Model

db.user = require('../model/auth/user.model.js')(sequelize, Sequelize);
db.role = require('../model/auth/role.model.js')(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});


//Assets Model

db.asset = require('../model/asset/asset_profile.model.js')(sequelize, Sequelize);

//Communication

db.communication = require('../model/communication/com_profile.model.js')(sequelize, Sequelize);


//Setting MQTT

db.setting_mqtt = require('../model/setting/mqtt.modal.js')(sequelize, Sequelize);


//Setting SNMP
db.setting_snmp = require('../model/setting/snmp.modal.js')(sequelize,Sequelize);
db.setting_snmp_oid = require('../model/setting/snmp_mib.modal.js')(sequelize,Sequelize); //snmp_mib


db.setting_snmp.hasMany(db.setting_snmp_oid,{foreignKey:'id_profile',sourceKey:'id'})
db.setting_snmp_oid.belongsTo(db.setting_snmp, {foreignKey:'id_profile',targetKey: 'id'})


//LOG

db.setting_log = require('../model/setting/log.modal.js')(sequelize, Sequelize);


//HMI SECURITY

db.setting_hmi = require('../model/setting/hmi.security.modal.js')(sequelize, Sequelize);

//time
db.time = require('../model/time/time.model.js')(sequelize,Sequelize); 


//profile smartrack

db.profile = require('../model/setting/profile.modal.js')(sequelize,Sequelize);


module.exports = db;
