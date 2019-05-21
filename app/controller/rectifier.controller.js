const db = require('../config/db.config.js');
const Profile = db.rectifier_profile;
const Latest = db.rectifier_latest;
const Log = db.rectifier_timeseries;
const Library = db.rectifier_library;
const Protocol = db.rectifier_protocol;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const io = require('../../socketio');
const jsonmodel = require('../model/rectifier/jsonmodel.js');
const socketroom = "rectifier_room";

let increment = 0;

const csv = db.rectifier_report;

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
        rectifier_protocols  : [{
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
                    category    : item.category,
                    read_this   : item.read_this,
                    write_this  : item.write_this,
                })
            }))
            .then(()=>{
                res.send("Rectifrectifier Profile Create");
                var newVAlue = []

                req.body.available_data.map(d => {
                    newVAlue.push({
                        var_name : d.var_name,
                        unit: d.unit,
                        category: d.category
                    })
                })

                console.log(newVAlue)
                csv.create({
                    id_profile: data.id,
                    data: JSON.stringify(newVAlue)
                }).then(()=>{
                    console.log("New coloumm created!!!")
                })

            });
        })
}

exports.updatelatest = (req,res,next) => {

    if(increment <= 100 ){
        io.getIO().in(socketroom).emit("rectifier_data",req.body.newValue)
        res.status(200).send('Sucessfull Update And Log');
        increment = increment + 1;
    }
    else if( increment >= 101){

    Promise.all(req.body.newValue.map(data => {
        Latest.update({value : data.value},
        {where : {id_profile : req.params.profileId,
                 var_name : data.var_name
                }
        })}))
        .then( () => {
            io.getIO().in(socketroom).emit("rectifier_data",req.body.newValue)
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
        increment = 0;
    }
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

exports.getWillMount = (req,res,next) =>{
    id_profile = req.params.idProfile;
    var arrData = []
    Latest.findAll({attributes : ['id','var_name','unit','value','category'],
     where : {id_profile : req.params.idProfile,
              read_this : { [Op.gt]: 0 }
            }
            })
            .then(datas => {
                Promise.all(datas.map( data => {
                    arrData.push(
                        {
                            "var_name" : data.var_name,
                            "value"    : data.value,
                            "unit"     : data.unit,
                            "category"      : data.category,
                            "id_profile"    : id_profile
                        }
                    )
                }
                    
                )
                )
                .then(()=>{
                    // io.getIO().in(socketroom).emit("rectifier_data",arrData)
                    // arrData = [];
                    // res.send("Up to Date");
                    res.status(200).send(arrData);
                    arrData = [];
                })
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
        res.status(200).send(JSON.parse(data.available_data));
    }).catch( () =>{
        res.status(404).send("Data Null");
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
    }).catch( () =>{
        res.status(404).send("Data Null");
    })
}

exports.findById = (req,res,next) => {
    var id = req.params.profileId;
    Profile.findOne({where : {id : id}}).then(profiles => {
        var profile = profiles;
        Protocol.findOne( {attributes : ['protocolSetting'],where : {id_profile : id}}).then(protocols => {
            var protocol = JSON.parse(protocols.protocolSetting);
            Latest.findAll({where : {id_profile : req.params.profileId}})
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
                            read_this   : item.read_this,
                            write_this  : item.write_this,
                        },
                        {where : {id : item.id}})
                    })).then(res.send("Data Uptodate"));
                })
             });
};

