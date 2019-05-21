const db = require('../config/db.config.js');
const Ac = db.aircond_profile;
const AcLibs = db.aircond_library;
const Battery = db.battery_profile;
const BatLibs = db.battery_library
const Pdu = db.pdu_profile;
const PduLibs = db.pdu_library
const Recti = db.rectifier_profile;
const RectiLibs = db.rectifier_library;
const Ups = db.ups_profile
const UpsLibs = db.ups_library



getAC = (req, res, next)=>{
    Ac.findAll({attributes : ['name']
    }).then(data=>{ 
        var datas = datas
        AcLibs.findAll({attributes : ['available_data']
        }).then(datb=>{
            var datax = JSON.parse(datb);

            
        })
    })


}
