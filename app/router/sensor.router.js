module.exports = function(app){
    const sensor = require('../controller/sensor.controller.js');

    // Profile sensor Router
    app.post('/api/sensor/profile',sensor.create);

    app.get('/api/sensor/profile',sensor.findAll);

    app.get('/api/sensor/profile/type',sensor.getSensorType);

    app.get('/api/sensor/profile/:profileId',sensor.findById);

    app.patch('/api/sensor/profile/:profileId',sensor.update);

    app.delete('/api/sensor/profile/:profileId',sensor.delete);

    //Dashboard sensor Router
    app.get('/api/sensor/dashboard/:page',sensor.Dashboard);

    //Firmware update data
    app.patch('/api/sensor/updatevalue',sensor.updateValue);

}