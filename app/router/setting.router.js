module.exports = function(app){
    const setting = require('../controller/setting.controller.js');
    const time = require('../controller/time.setting.controller.js')

    //MQTT 
    app.get('/api/settings/getMqtt', setting.findAllMQTT);

    app.patch('/api/settings/updateMqtt', setting.updateMQTT);

    app.post('/api/settings/createMqtt', setting.createMQTT);


    //SNMP
    app.get('/api/settings/getSNMP', setting.findAllSNMP);

    app.patch('/api/settings/updateSNMP', setting.updateSNMP);

    app.post('/api/settings/createSNMP', setting.createSNMP);


    //LOG
    app.get('/api/settings/getLog', setting.findAllLog);
    app.post('/api/settings/createLog',setting.createLog);
    app.patch('/api/settings/editLog',setting.updateLog);


    //HMI SECURITY
    app.get('/api/settings/getHMI', setting.findAllHMI);
    app.post('/api/settings/createHMI',setting.createHMI);
    app.patch('/api/settings/editHMI',setting.updateHMI);


    //time
    app.get('/api/settings/getTime', time.get);
    app.post('/api/settings/createTime',time.create);
    app.patch('/api/settings/editTime',time.update);



}