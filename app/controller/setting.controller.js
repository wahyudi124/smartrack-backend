const db = require('../config/db.config.js');
const mqtt = db.setting_mqtt;
const snmp = db.setting_snmp;
const SNMP_OID = db.setting_snmp_oid;
const Log = db.setting_log;
const HMI = db.setting_hmi;
const profile = db.profile;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jsonmodel = require('../model/setting/jsonmodel.js');


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
            list_MIB :  JSON.stringify(req.body.mib_list),
                               }]
                },
        {
            include : [SNMP_OID]
        }).then(test => {
        res.status(200).send("New SNMP Settings Created!!!");
    })
}



exports.findAllSNMP = (req,res,next) => {
    snmp.findOne({where: {id: req.params.profileId}}).then(data =>{
        var datas = data;
        // SNMP_OID.findAll({attributes: { exclude: ['id_profile', 'id']}}).then(oid =>{
        SNMP_OID.findOne({attributes : ['list_MIB'], where : {id_profile : req.params.profileId}})
        .then(oid =>{
            var dataoidi = JSON.parse(oid.list_MIB);
            jsonmodel.set(data, dataoidi);
            // var dataoidi = JSON.parse(oid.list_MIB);
            // jsonmodel.set(datas,dataoidi)
            res.status(200).send(jsonmodel.get());
        })
        
    })

    // SNMP_OID.findOne({attributes : ['list_MIB'],where : {id_profile : req.params.profileId}})
    //                 .then(data=>{
    //                     res.send(JSON.parse(data.list_MIB));
    //                 })

    // snmp.findAll().then(data =>{
    //     SNMP_OID.findAll().then(dataoid =>{
    //         var datas = JSON.parse(dataoid.list_MIB);
    //         jsonmodel.set(data,datas);
    //         res.send(jsonmodel.get());
    //     })
        
    // })

    // snmp.findAll().then(data =>{
    //     res.send(data);
    // })
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



//HMI

exports.updateHMI = (req, res, next) => {
    var id = 1;
    HMI.findOne({
        where: {
            id: id
        }
    }).then(data => {
        var pinlama = bcrypt.compareSync(req.body.old_pin, data.pin);
        if (!pinlama) {
            return res.status(401).send({update: false, reason: "The Old Password entered was invalid"});
        }
        pinbaru = bcrypt.hashSync(req.body.new_pin, 8)

        HMI.update({pin : pinbaru}).then(()=>{
            res.status(200).send("PIN Updated");
        });
    });
}



exports.createHMI = (req, res, next) => {
    HMI.create({
        mode : req.body.mode,
        pin : bcrypt.hashSync(req.body.old_pin, 8)
    }).then(test => {
        res.status(200).send({pass : test.pin, message: "New PIN Created!!!"});
    })
}

exports.findAllHMI = (req,res,next) => {
    HMI.findAll().then(data =>{
        res.send(data);
    })
}




//profile smart rack

exports.getProfile = (req, res, next) => {
    profile.findAll().then(data =>{
        res.send(data);
    })
}


exports.createProfile = (req, res, next) => {
    profile.create({
        smartrack_name : req.body.smartrack_name,
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        floor: req.body.floor,
        room: req.body.room,
        supplier: req.body.supplier,
        supplier_contact : req.body.supplier_contact,
        installed_by : req.body.installed_by,
        installed_date : req.body.installed_date
    }).then(()=>{
        res.status(200).send("profile Created!!")
    })
}

exports.updateProfile = (req, res, next ) => {
    profile.update({
        smartrack_name : req.body.smartrack_name,
        address: req.body.address,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        floor: req.body.floor,
        room: req.body.room,
        supplier: req.body.supplier,
        supplier_contact : req.body.supplier_contact,
        installed_by : req.body.installed_by,
        installed_date : req.body.installed_date
    }, {
        where: {id : 1 }
    }).then(()=>{
        res.status(200).send("profile updated");

    })
}
