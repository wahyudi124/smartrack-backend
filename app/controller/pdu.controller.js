const db = require('../config/db.config.js');
const Profile = db.pdu_profile;
const Latest = db.pdu_latest;
const Log = db.pdu_timeseries;
const Library = db.pdu_library;
const Protocol = db.pdu_protocol;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const io = require('../../socketio');
const jsonmodel = require('../model/pdu/jsonmodel.js');

//OK
exports.create = (req, res, next) => {
   
  Profile.create({
        name                : req.body.name,  
        manufacturer        : req.body.manufacturer,
        part_number         : req.body.part_number,
        serial_number       : req.body.serial_number,
        supplier            : req.body.supplier,
        supplier_contact    : req.body.supplier_contact,
        installed_by        : req.body.installed_by,
        installation_date   : req.body.installation_date,
        pdu_protocols  : [{
            protocolSetting : JSON.stringify(req.body.protocol),
                               }]
                },
                {
                    include : [Protocol]
                }
        ).then(data => {
            Promise.all(req.body.available_data.map(item => {
                Latest.create({
                    var_name    : item.var_name,
                    id_profile  : data.id,
                    unit        : item.unit,
                    read_this   : item.read,
                    write_this  : item.write,
                })
            }))
            .then(res.send("PDU Profile Create"));
        })
}

exports.updatelatest = (req,res,next) => {

    Promise.all(req.body.newValue.map(data => {
        Latest.update({value : data.value},
        {where : {id_profile : req.params.profileId,
                 var_name : data.var_name
                }
        })}))
        .then( () => {
            io.getIO().emit("rectifier_data",req.body.newValue)
            Log.create({
                id_profile : req.params.id_profile,
                data : JSON.stringify(req.body.newValue)
            }).then( () => {
                res.status(200).send('Sucessfull Update And Log');
            })
        })
        .catch( err => {
            res.status(404).send({'message': err});
        })
}

exports.getAllManufaturer = (req,res,next) => {
    Library.findAll({
        attributes : ['manufacturer']}
        ).then(data => {
            var dataArray = [];
            data.map( data =>{
                if(isInArray(data.manufacturer,dataArray) == false){
                   dataArray.push(data.manufacturer);
                }})
            res.status(200).send({"manufacturer" : dataArray});
        })
}

exports.getAllPartNumber = (req,res,next) => {
    Library.findAll(
        {attributes : ['part_number'],
        where : {manufacturer : req.params.manufacturerName}},
        ).then(data => {
            var dataArray = [];
            data.map( data =>{
                if(isInArray(data.part_number,dataArray) == false){
                   dataArray.push(data.part_number);
                }})
            res.status(200).send({"part_number" : dataArray});
        })
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

exports.getAvaiableProtocol = (req,res,next) => {
    Library.findAll(
        {attributes : ['protocol'],
        where : {
            manufacturer : req.params.manufacturer,
            part_number : req.params.part_number,}},
        
        ).then(data => {
            var dataArray = [];
            data.map( data =>{
                if(isInArray(data.protocol,dataArray) == false){
                   dataArray.push(data.protocol);
                }})
            res.status(200).send({"protocol" : dataArray});
        })
}


exports.getDataConfig = (req,res,next) => {
    Library.findOne(
        {attributes : ['available_data'],
        where : {
            manufacturer : req.body.manufacturer,
            part_number  : req.body.part_number,
            protocol     : req.body.protocol
        }},
    ).then(data =>{
        //console.log(data);
        res.status(200).send(data.available_data);
    })
}

exports.addLibrary = (req,res,next) => {
    Library.create({
        manufacturer : req.body.manufacturer,
        part_number : req.body.part_number,
        protocol : req.body.protocol,
        available_data : JSON.stringify(req.body.available_data)
    }).then(data => {
        res.status(200).send({"message" : "Library Create"});
    })
}

exports.findAll = (req,res,next) => {
    Profile.findAll().then(data =>{
        res.send(data);
    })
}

exports.findById = (req,res,next) => {
    var id = req.params.profileId;
    Profile.findOne({where : {id : id}}).then(profiles => {
        var profile = profiles;
        Protocol.findOne( {attributes : ['protocolSetting']}, {where : {id_profile : id}}).then(protocols => {
            var protocol = JSON.parse(protocols.protocolSetting);
            Latest.findAll({attributes : ['id','var_name','unit','read_this','write_this'], where : {id_profile : req.params.profileId}})
            .then(latests => {
                jsonmodel.set(profile,protocol,latests);
                res.status(200).send(jsonmodel.get())
        }).catch(()=>{
            res.status(404).send(
                {
                    "request" : {
                        "type" : "POST",
                        "url" : "http://localhost:5005/api/ups/profile/"+id,
                        "message" : "Profile Not Found With ID = " + id
                    }})
        })
    }).catch(()=>{
        res.status(404).send(
            {
                "request" : {
                    "type" : "POST",
                    "url" : "http://localhost:5005/api/ups/profile/"+id,
                    "message" : "Profile Not Found With ID = " + id
                }})
    })
    })
    .catch(()=>{
        res.status(404).send(
            {
                "request" : {
                    "type" : "POST",
                    "url" : "http://localhost:5005/api/ups/profile/"+id,
                    "message" : "Profile Not Found With ID = " + id
                }})
    })

}

exports.delete = (req, res,next) => {
    const id = req.params.profileId;
    Latest.destroy({
      where: { id_profile: id },
    }).then(() => {
      Protocol.destroy({
        where : {id_profile :  id},  
      }).then(() =>{
        Profile.destroy({
            where : {id: id},
        }).then(() =>{
          res.status(200).send('deleted successfully a IO Profile with id = ' + id);
        })
      })
    });
};

exports.update = (req, res,next) => {
    Profile.update( 
        {   name                : req.body.name,  
            manufacturer        : req.body.manufacturer,
            part_number         : req.body.part_number,
            serial_number       : req.body.serial_number,
            supplier            : req.body.supplier,
            supplier_contact    : req.body.supplier_contact,
            installed_by        : req.body.installed_by,
            installation_date   : req.body.installation_date },
        { where: {id: req.params.profileId} }
             ).then(() => {
                Protocol.update({protocolSetting : JSON.stringify(req.body.protocol)}, {where : {id_profile : req.params.profileId}})
                .then(()=>{
                    Promise.all(req.body.available_data.map(item => {
                        Latest.update({
                            var_name    : item.var_name,
                            id_profile  : req.params.profileId,
                            unit        : item.unit,
                            read_this   : item.read,
                            write_this  : item.write,
                        },
                        {where : {id : item.id}})
                    })).then(res.send("Data Uptodate"));
                })
             });
};

