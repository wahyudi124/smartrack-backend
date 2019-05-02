const db = require('../config/db.config.js');
const time = db.time;
const Sequelize = require('sequelize');
const OP = Sequelize.Op;

exports.create = (req, res, next) => {
    time.create({
        date_time: req.body.date_time,
        sntp_enable: req.body.sntp_enable,
        sntp_prim_add: req.body.sntp_prim_add,
        sntp_back_add: req.body.sntp_back_add,
        udp_port: req.body.udp_port,
        pollinterval: req.body.pollinterval
    }).then(comm => {
        res.status(200).send("New Set Time Created!!!");
    })
}

exports.update = (req, res, next) => {
    const id = 1;
    time.update({
        date_time: req.body.date_time,
        sntp_enable: req.body.sntp_enable,
        sntp_prim_address: req.body.sntp_prim_add,
        sntp_back_address: req.body.sntp_back_add,
        udp_port: req.body.udp_port,
        pollinterval: req.body.pollinterval
    },
    {
        where: {id: 1}
    }).then(() => {
        res.status(200).send("Update Set Time Successfully!!! ");
    });

}

exports.get = (req, res, next) =>  {
    time.findAll().then(data =>{
        res.send(data);
    })
}