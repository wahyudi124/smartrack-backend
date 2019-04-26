const db = require('../config/db.config.js');
const Profile = db.sensor_profile;
const Latest = db.sensor_latest;
const Library = db.sensor_library;
const Log = db.sensor_timeseries;
const io = require('../../socketio');



exports.getSensorType = (req,res,next) => {
    Library.findAll({attributes : ['type']})
    .then(data =>{
        res.send(data);
    })
}

exports.create = (req, res, next) => {

    Library.findOne({attributes : ['avaiable_data']}, {where : {type : req.body.type}})
    .then(() => {
    Profile.create({
        name        : req.body.name,  
        type        : req.body.type,
        address     : req.body.address,
        AES128_key      : req.body.AES128_key,
    }
    ).then(data => {
        var id = data.id
        Library.findOne({attributes : ['avaiable_data']}, {where : {type : req.body.type}})
        .then(data => {
            var datas = JSON.parse(data.avaiable_data);
            Promise.all(datas.available_data.map( item =>{
                Latest.create({
                    var_name : item.var_name,
                    id_profile : id,
                    unit :  item.unit
                }).then(() =>{
                    res.send("Sensor Added");
                })
            }))
        })
        .catch( err =>{
            res.send("Library not Found")
        })
    })
    })
    .catch(()=>{
        res.send("Library not Found")
    })
}

exports.findAll = (req,res,next) => {
    Profile.findAll().then(data =>{
        res.send(data);
    })
}

exports.findById = (req,res,next) => {
    Profile.findByPk(req.params.profileId).then(data => {
        res.send(data);
    })
}

exports.update = (req, res,next) => {
    const id = req.params.profileId;
    Profile.update( {  name      : req.body.name,  
        type      : req.body.type,
        port      : req.body.port,
        unit      : req.body.unit }, 
    { where: {id: req.params.profileId} }
    ).then(() => {
        Profile.findOne({attributes : ['type']}, {where : {id : id}})
        .then(data => {
            if(data.type !== req.body.type){
                Latest.destroy({where : {id_profile : id}})
                .then(()=>{
                    Library.findOne({attributes : ['avaiable_data']}, {where : {type : req.body.type}})
                    .then(data => {
                        var datas = JSON.parse(data.avaiable_data);
                        Promise.all(datas.available_data.map( item =>{
                            Latest.create({
                                var_name : item.var_name,
                                id_profile : id,
                                unit :  item.unit
                            }).then(() =>{
                                res.send("Sensor Update");
                            })
                        }))
                    })
                    .catch(()=>{
                        res.send("Library Not Found");
                    })
                })
            }
            else {
                res.send("Sensor Update");
            }
        })
    })
};

exports.updateValue = (req,res,next) => {
    try{
    req.body.newValue.map(data => {
        Latest.update({ value : data.value },
                      { where : {id_profile : data.id}})
    })
    Log.create({
          data : JSON.stringify(req.body.newValue),
    })
    res.status(200).send('OK');
    io.getIO().emit('sensor_latest',req.body);
    } catch (err){
        res.status(404).send({'message': err});
    }
}

exports.delete = (req, res,next) => {
    const id = req.params.profileId;
    Latest.destroy({
        where: { id_profile: id },
    }).then(() => {
        Profile.destroy({
            where : {id: id},
        }).then(() =>{
        res.status(200).send('deleted successfully a Sensor Profile with id = ' + id);
        })
    });
};

exports.Dashboard = (req,res,next) => {
    let limit = 8;
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
                where : {id_profile:db.Sequelize.col('sensor_profile.id')},
                attributes : ['value']
            }]
        }).then(data =>{
            res.status(200).json({'result': data, 'count': data.count, 'totalPages': pages});
        })
    })
    
}
  