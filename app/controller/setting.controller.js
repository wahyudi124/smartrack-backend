const db = require('../config/db.config.js');
const mqtt = db.setting_mqtt;
const snmp = db.setting_snmp;
const SNMP_OID = db.setting_snmp_oid;
const datetime = db.setting_datetime;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


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



//SNMP

exports.updateSNMP = (req, res, next) => {
    const id = 1;
    snmp.update({
        enable: req.body.enable,
        snmp_version: req.body.snmp_version,
        snmp_port: req.body.snmp_port,
        read_community: req.body.read_community,
        write_community: req.body.write_community,
        sys_oid: req.body.sys_oid,
        
        
    },
    {
        where: {id: id}
    }).then(() => {
        res.status(200).send("MQTT Setting Updated  Successfully!!! ");
    });

}

exports.createSNMP = (req, res, next) => {

    snmp.create({
        enable: req.body.enable,
        broker_address: req.body.broken_address,
        broker_port: req.body.broken_port,
        username: req.body.username,
        password: req.body.password,
        pubtopic: req.body.pubtopic,
        retain: req.body.retain,
        qos: req.body.qos,
        mib_list : [{
            mibList : JSON.stringify(req.body.protocol),
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
        res.send(data);
    })
}



