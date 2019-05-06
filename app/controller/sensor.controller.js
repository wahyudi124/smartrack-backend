const db = require('../config/db.config.js');
const Profile = db.sensor_profile;
const Latest = db.sensor_latest;
const Library = db.sensor_library;
const Log = db.sensor_timeseries;
const io = require('../../socketio');



exports.getSensorType = (req,res,next) => {
    Library.findAll({
        attributes : ['type']}
        ).then(data => {
            var dataArray = [];
            data.map( data =>{
                if(isInArray(data.type,dataArray) == false){
                   dataArray.push(data.type);
                }})
            res.status(200).send({"type" : dataArray});
        })
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

exports.create = (req, res, next) => {

    Library.findOne({attributes : ['avaiable_data'],where : {type : req.body.type}})
    .then(() => {
    Profile.create({
        name        : req.body.name,  
        type        : req.body.type,
        address     : req.body.address,
        AES128_key  : req.body.AES128_key,
    }
    ).then(data => {
        var id = data.id
        Library.findOne({attributes : ['avaiable_data'], where : {type : req.body.type}})
        .then(data => {
            var datas = JSON.parse(data.avaiable_data);
            Promise.all(datas.available_data.map( item =>{
                Latest.create({
                    var_name : item.var_name,
                    id_profile : id,
                    unit :  item.unit
                })
            })).then(() =>{
                res.status(200).json({"message" : "Sensor Create"})
            })
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
    Profile.findByPk(req.params.profileId).then(datas => {
        Latest.findAll({attributes : ['id','var_name','value','unit'], where : {id_profile : req.params.profileId}})
        .then(data =>{
            res.json({
                "id": datas.id,
                "name": datas.name,
                "type": datas.type,
                "address": datas.address,
                "AES128_key": datas.AES128_key,
                "available_data": data 
            })
        })
    })
}

exports.update = (req, res,next) => {
    const id = req.params.profileId;
    Profile.update( {  
        name      : req.body.name,  
        type      : req.body.type,
        address      : req.body.address,
        AES128_key      : req.body.AES128_key }, 
    { where: {id: id} }
    ).then(() => {
        Promise.all(req.body.available_data.map( item =>{
            Latest.update({
                var_name : item.var_name,
                unit :  item.unit
            },
        {where : {id : item.id}})
        }))
        .then(()=>{
            res.send(" Profile Uptodate")
        })
        .catch(()=>{
            res.send(" Error")
        })
    })
};

exports.updateValue = (req,res,next) => {
    Promise.all(req.body.newValue.map(data => {
        Latest.update({ value : data.value },
                      { where : {id : data.id}})
    }))
    .then(()=>{
        res.status(200).send('OK');
        io.getIO().emit('sensor_latest',req.body);
        Log.create({
            data : JSON.stringify(req.body),
        })
    })
    .catch(()=>{
        res.status(404).send({'message': err});
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
  