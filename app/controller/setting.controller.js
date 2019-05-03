const db = require('../config/db.config.js');
const mqtt = db.setting_mqtt;
const snmp = db.setting_snmp;
const SNMP_OID = db.setting_snmp_oid;
const Log = db.setting_log;
const HMI = db.setting_hmi;
const datetime = db.setting_datetime;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


var bcrypt = require('bcryptjs');


//MQTT

exports.updateMQTT = (req, res, next) => {
    const id = 1;
    mqtt.update({
        enable: req.body.enable,
        broker_address: req.body.broker_address,
        broker_port: req.body.broker_port,
        username: req.body.username,
        password: req.body.password,
        pubtopic: req.body.pubtopic,
        retain: req.body.retain,
        qos: req.body.qos
    },
    {
        where: {id: id}
    }).then(() => {
        res.status(200).send("MQTT Setting Updated  Successfully!!! ");
    });

}

exports.createMQTT = (req, res, next) => {

    mqtt.create({
        enable: req.body.enable,
        broker_address: req.body.broken_address,
        broker_port: req.body.broken_port,
        username: req.body.username,
        password: req.body.password,
        pubtopic: req.body.pubtopic,
        retain: req.body.retain,
        qos: req.body.qos

    }).then(test => {
        res.status(200).send("New MQTT Settings Created!!!");
    })
}

exports.findAllMQTT = (req,res,next) => {
    mqtt.findAll().then(data =>{
        res.send(data);
    })
}


// IN ARRAY

function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }



//SNMP
exports.updateSNMP = (req, res, next) => {
    const id = 1;
    snmp.update({
        enable: req.body.enable,
        snmp_version: req.body.snmp_version,
        snmp_port: req.body.snmp_port,
        read_comunity: req.body.read_community,
        write_comunity: req.body.write_community,
        sysoid: req.body.sys_oid,
        
        
    },
    {
        where: {id: id}
    }).then(() => {
        SNMP_OID.update({list_MIB : JSON.stringify(req.body.mib_list)}, {where: {id_profile : 1}})
        res.status(200).send("SNMP Setting Updated  Successfully!!! ");
    });

}



exports.createSNMP = (req, res, next) => {

    snmp.create({
        enable: req.body.enable,
        snmp_version: req.body.snmp_version,
        snmp_port: req.body.snmp_port,
        read_comunity: req.body.read_community,
        write_comunity: req.body.write_community,
        sysoid: req.body.sys_oid,
        
        snmp_mibs : [{
            list_MIB : JSON.stringify(req.body.mib_list),
                               }]
                },
        {
            include : [SNMP_OID]
        }).then(test => {
        res.status(200).send("New SNMP Settings Created!!!");
    })
}



exports.findAllSNMP = (req,res,next) => {
    snmp.findAll().then(data =>{
        var datas = data;
        SNMP_OID.findAll().then(dataoid =>{
            var dataoid = JSON.parse(dataoid.list_MIB);
            jsonmodel.set(datas,dataoid)
            res.status(200).send(jsonmodel.get());
        })
        
    })
}


//LOG

exports.updateLog = (req, res, next) => {
    const id = 1;
    Log.update({
        eventlog_max_entry: req.body.event_max_entry,
        datalog_max_entries: req.body.data_max_entry,
        normal_interval: req.body.normal_interval
        
    },
    {
        where: {id: id}
    }).then(() => {
        res.status(200).send("Log Setting Updated  Successfully!!! ");
    });

}



exports.createLog = (req, res, next) => {
    Log.create({
        eventlog_max_entry: req.body.event_max_entry,
        datalog_max_entries: req.body.data_max_entry,
        normal_interval: req.body.normal_interval   
    }).then(test => {
        res.status(200).send("New Log Settings Created!!!");
    })
}

exports.findAllLog = (req,res,next) => {
    Log.findAll().then(data =>{
        res.send(data);
    })
}



// Update Password
exports.updatePass = (req, res) => {
    console.log("Update Password");
  
    User.findOne({
      where: {
        Id: req.body.users.id
      }
    }).then(user=> {
      var passwordlama =  bcrypt.compareSync(req.body.users.password, user.password);
      if (!passwordlama){
        return res.status(401).send({ update: false, reason: "The Old Password entered was invalid"});
      }
  
      passwordbaru = bcrypt.hashSync(req.body.users.passwordNew, 8)
      // user.update({password: passwordbaru}).success(res.send("User Changed Password successfully!"));
      user.update({password: passwordbaru}).then(()=> {
        res.status(200).send("Password Updated");
      });
      
    });
  }



//HMI


exports.updateHMI = (req, res, next) => {
    const id = 1;
    HMI.findOne({}).then(pin => {
        var pinlama = bcrypt.compareSync(req.body.old_pin, pin.pin);
        if (!pinlama){
            return res.status(401).send({ update: false, reason: "The Old pin entered was invalid"});
        }
        pinbaru - bcrypt.hashSync(req.body.new_pin,8)
        HMI.update({pin: pinbaru}).then(()=>{
            res.status(200).send("Pin Updated");
        });
    })
}



exports.createHMI = (req, res, next) => {
    HMI.create({
        mode : req.body.mode,
        pin: bcrypt.hashSync(req.body.old_pin,8)
    }).then(test => {
        res.status(200).send("New PIN Created!!!");
    })
}

exports.findAllHMI = (req,res,next) => {
    HMI.findAll().then(data =>{
        res.send(data);
    })
}



