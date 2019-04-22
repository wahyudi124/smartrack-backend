const db = require('../config/db.config.js');
const Profile = db.io_profile;
const Latest = db.io_latest;
const TimeSeries = db.io_timeseries;

const io = require('../../socketio');

exports.create = (req, res, next) => {
    Profile.create({
        name      : req.body.name,  
        type      : req.body.type,
        port      : req.body.port,
        min_value : req.body.min_value,
        max_value : req.body.max_value,
        unit      : req.body.unit,
        io_latests: [{  // -> databseName Relation with Profile 
                        value : null
                    }]
    },
    {
        include : [Latest]
    }
    
    ).then(Profile => {
        res.send({message : "Done!"})
    })
}

exports.findAll = (req,res,next) => {
    Profile.findAll().then(io_profiles =>{
        res.send(io_profiles);
    })
}

exports.findById = (req,res,next) => {
    Profile.findByPk(req.params.profileId).then(io_profiles => {
        res.send(io_profiles);
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
             io.getIO().emit('message', {id_profile : req.params.profileId, value: req.body.value});
             res.status(200).send("State Change a IO Profile with id = " + id);
             });
    
}
  