const db = require('../config/db.config.js');
const comm = db.communication;
const Sequelize = require('sequelize');
const OP = Sequelize.Op;

exports.create = (req, res, next) => {
    comm.create({
        eth_dhcp: req.body.eth_dhcp,
        eth_ipaddress: req.body.eth_ipaddress,
        eth_netmask: req.body.eth_netmask,
        eth_gateway: req.body.eth_gateway,
        wifi_ssid: req.body.wifi_ssid,
        wifi_password: req.body.wifi_password,
        wifi_dhcp: req.body.wifi_dhcp,
        wifi_ipaddress: req.body.wifi_ipaddress,
        wifi_netmask: req.body.wifi_netmask,
        wifi_gateway: req.body.wifi_gateway
    }).then(comm => {
        res.status(200).send("New Communication Created!!!");
    })
}

exports.update = (req, res, next) => {
    const id = 1;
    comm.update({
        eth_ipaddress: req.body.eth_ipaddress,
        eth_netmask: req.body.eth_netmask,
        eth_gateway: req.body.eth_gateway,
        wifi_ssid: req.body.wifi_ssid,
        wifi_password: req.body.wifi_password,
        wifi_dhcp: req.body.wifi_dhcp,
        wifi_ipaddress: req.body.wifi_ipaddress,
        wifi_netmask: req.body.wifi_netmask,
        wifi_gateway: req.body.wifi_gateway
    },
    {
        where: {id: 1}
    }).then(() => {
        res.status(200).send("Update Comunication Successfully!!! ");
    });

}


exports.get = (req,res,next) => {
    comm.findAll().then(data =>{
        res.send(data);
    })
}