const db = require('../config/db.config.js');
const asset = db.asset;
const Sequelize = require('sequelize');
const OP = Sequelize.Op;

const io = require('../../socketio');

exports.create = (req, res, next) =>{
    var data = JSON.parse(req.body);
    Promise.all(data.assets.map(item => {
        asset.create({
            name: item.name,
            manufacturer: item.manufacturer,
            part_number: item.part_number,
            supplier: item.supplier,
            supplier_contact: item.supplier_contact,
            installed_by: item.installed_by,
            installed_date: item.installed_date,
            description: item.description
        })
    }))
    .then(data => {
        console.log(data);
        res.send("New Asset Created!!");
    })
}

exports.findall = (req,res,next)=>{
    asset.findAll().then(asset_profile =>{
        res.send(asset_profile);
    })
}

exports.findById = (req, res, next)=>{
    asset.findByPk(req.params.profileId).then(asset_profile => {
        res.send(asset_profile);
    })
}

exports.update = (req, res,next) => {
    const id = req.params.profileId;
    Profile.update( {  name      : req.body.assets.name,  
                        manufacturer: req.body.assets.manufacturer,
                        part_number : req.body.assets.part_number,
                        supplier    : req.body.assets.supplier,
                        supplier_contact : req.body.assets.supplier_contact,
                        installed_by : req.body.assets.installed_by,
                        installed_date : req.body.assets.installed_date }, 
             { where: {id: req.params.profileId} }
             ).then(() => {
             res.status(200).send("updated successfully a Asset Profile with id = " + id);
             });
};




exports.findControlProfile = (req,res,next) => {
    Profile.findAll({
        where: {[Op.or]: [{type: 'DI'}, {type: 'AI'}]},
      }).then(data => {
        res.status(200).json({'result': data});
      })
}



exports.update = (req, res,next) => {
    const id = req.params.profileId;
    Profile.update( {  name      : req.body.name,  
                        type      : req.body.type,
                        port      : req.body.port,
                        min_value : req.body.min_value,
                        max_value : req.body.max_value,
                        unit      : req.body.unit }, 
             { where: {id: req.params.profileId} }
             ).then(() => {
             res.status(200).send("updated successfully a IO Profile with id = " + id);
             });
};

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

exports.Dashboard = (req,res,next) => {
    let limit = 10;
    let offset = 0;
    let pages;
    Profile.findAndCountAll().then((data) => {
        let page = req.params.page;
        pages = Math.ceil(data.count / limit);
        offset = limit * (page -1 );

        Profile.findAll({
            attributes : [['id','id_profile'], 'name','port','type','unit'],
            limit : limit,
            offset : offset,
            $sort : {id : 1},
            include : [{
                model : Latest,
                where : {id_profile:db.Sequelize.col('io_profile.id')},
                attributes : ['value']
            }]
        }).then(data =>{
            res.status(200).json({'result': data, 'count': data.count, 'totalPages': pages});
        })
    })
}

exports.DashboardControl = (req,res,next) => {
    const id = req.params.profileId;
    Latest.update( {  value : req.body.value }, 
             { where: {id_profile: req.params.profileId} }
             ).then(() => {
                TimeSeries.create({
                    value : req.body.value,
                })
             res.status(200).send("State Change a IO Profile with id = " + id);
             });
}
  