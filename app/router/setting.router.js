module.exports = function(app){
    const setting = require('../controller/setting.controller.js');

    //MQTT 
    app.get('/api/settings/getMqtt', setting.findAllMQTT);

    app.patch('/api/settings/updateMqtt', setting.updateMQTT);

    app.post('/api/settings/createMqtt', setting.createMQTT);


    //SNMP
    app.get('/api/settings/getSNMP', setting.findAllSNMP);

    app.patch('/api/settings/updateSNMP', setting.updateSNMP);

    app.post('/api/settings/createSNMP', setting.createSNMP);





}