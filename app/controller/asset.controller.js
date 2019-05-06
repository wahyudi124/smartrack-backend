const db = require('../config/db.config.js');
const Asset = db.asset;
const Sequelize = require('sequelize');
const OP = Sequelize.Op;

const io = require('../../socketio');

exports.create =(req, res, next) => {
    Asset.create({
        name : req.body.name,
        manufacturer: req.body.manufacturer,
        part_number: req.body.part_number,
        supplier: req.body.supplier,
        supplier_contract: req.body.supplier_contact,
        installed_by: req.body.installed_by,
        installation_date: req.body.installation_date,
        description: req.body.description
    }).then(data =>{
        // console.log(data);
        res.send("New Asset Created");
    })
}

exports.findall = (req,res,next)=>{
    Asset.findAll().then(asset_profile =>{
        res.send({ asset: asset_profile});
    })
}

exports.findById = (req, res, next)=>{
    Asset.findByPk(req.params.profileId).then(asset_profile => {
        res.send(asset_profile);
    })
}

exports.update = (req, res,next) => {
    const id = req.params.profileId;
    Asset.update( {  
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        part_number: req.body.part_number,
        supplier: req.body.supplier,
        supplier_contract: req.body.supplier_contact,
        installed_by: req.body.installed_by,
        installation_date: req.body.installation_date,
        description: req.body.description }, 
    { where: {id: req.params.profileId} })
    .then(update => {
        console.log(update)
        res.status(200).send("updated successfully a Asset Profile with id = " + id);
    });
};


exports.delete = (req, res,next) => {
    const id = req.params.profileId;
    Asset.destroy({
      where: { id: id },
    }).then(() => {
        res.status(200).send('deleted successfully a Asset Profile with id = ' + id);
      })
    ;
};


  