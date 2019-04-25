const db = require('../config/db.config.js');
const Profile = db.rectifier_profile;
const Latest = db.rectifier_latest;
const Log = db.rectifier_timeseries;
const Library = db.rectifier_library;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const io = require('../../socketio');



exports.create = (req, res, next) => {
  Profile.create({
        name                : req.body.name,  
        manufacturer        : req.body.manufacturer,
        part_number         : req.body.part_number,
        serial_number       : req.body.serial_number,
        protocol            : req.body.protocol,
        supplier            : req.body.supplier,
        supplier_contact    : req.body.supplier_contact,
        installed_by        : req.body.installed_by,
        installation_date   : req.body.installation_date
    }).then(data => {
        Promise.all(req.body.available_data.map(item => {
            Latest.create({
                var_name    : item.var_name,
                id_profile  : data.id,
                unit        : item.unit,
                read_this   : item.read,
                write_this  : item.write,
            })
        }))
        .then(res.send("ok"));
    })
}

exports.getAllManufaturer = (req,res,next) => {
    Library.findAll({
        attributes : ['manufacturer']},
        ).then(data => {
            res.status(200).send(data);
        })
}

exports.getAllPartNumber = (req,res,next) => {
    Library.findAll(
        {attributes : ['part_number']},
        {where : {manufacturer : req.params.manufacturerName}},
        ).then(data => {
            res.status(200).send(data);
        })
}

exports.getAvaiableProtocol = (req,res,next) => {
    Library.findAll(
        {attributes : ['protocol']},
        {where : {
            manufacturer : req.params.manufacturer,
            part_number : req.params.part_number,}},
        
        ).then(data => {
            res.status(200).send(data);
        })
}

exports.getDataConfig = (req,res,next) => {
    Library.findOne(
        {attributes : ['available_data']},
        {where : {
            manufacturer : req.body.manufacturer,
            part_number  : req.body.part_number,
            protocol     : req.body.protocol
        }},
    ).then(data =>{
        //console.log(data);
        res.status(200).send(data.available_data);
    })
}

exports.findAll = (req,res,next) => {
    Profile.findAll().then(data =>{
        res.send(data);
    })
}

exports.findById = (req,res,next) => {
    // Profile.findByPk(req.params.profileId).then(data => {
    //     res.send(data);
    // })

    Profile.findOne(
        {include : [{
            model : Latest,
            attributes : ['var_name','unit','read_this','write_this'],
            where : {id_profile:req.params.profileId},
        }]},
        {where : {id : req.params.profileId}},
        ).then(data => {
            res.status(200).send(data);
        })
}

exports.delete = (req, res,next) => {
    const id = req.params.profileId;
    Latest.destroy({
      where: { id_profile: id },
    }).then(() => {
      Profile.destroy({
          where : {id: id},
      }).then(() =>{
        res.status(200).send('deleted successfully a IO Profile with id = ' + id);
      })
    });
};

exports.update = (req, res,next) => {
    Profile.update( 
        {   name                : req.body.name,  
            manufacturer        : req.body.manufacturer,
            part_number         : req.body.part_number,
            serial_number       : req.body.serial_number,
            protocol            : req.body.protocol,
            supplier            : req.body.supplier,
            supplier_contact    : req.body.supplier_contact,
            installed_by        : req.body.installed_by,
            installation_date   : req.body.installation_date },
        { where: {id: req.params.profileId} }
             ).then(() => {
                Latest.destroy({
                    where: { id_profile: req.params.profileId },
                  })
                .then( () => {
                Promise.all(req.body.rectifier_latest.map(item => {
                    Latest.create({
                        var_name    : item.var_name,
                        id_profile  : req.params.profileId,
                        unit        : item.unit,
                        read_this   : item.read,
                        write_this  : item.write,
                    })
                })).then(res.send("ok"));
                })
                
             });
};




