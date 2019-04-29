module.exports = function(app){
    const battery = require('../controller/battery.controller.js');

    // // Profile rectifier Router
    app.post('/api/battery/profile',battery.create);

    app.get('/api/battery/profile',battery.findAll);

    app.get('/api/battery/profile/:profileId',battery.findById);

    app.patch('/api/battery/profile/:profileId',battery.update);

    app.delete('/api/battery/profile/:profileId',battery.delete);

    // //Dashboard rectifier Router
    // app.get('/api/rectifier/dashboard/:page',rectifier.Dashboard);

    // app.patch('/api/rectifier/dashboard/:profileId', rectifier.DashboardControl);

    // //Get Monitor rectifier By Firmware
    app.patch('/api/battery/updatevalue/:profileId',battery.updatelatest);

    app.post('/api/battery/library',battery.addLibrary);

    app.get('/api/battery/dataconfig',battery.getDataConfig);

    app.get('/api/battery/library/manufacture',battery.getAllManufaturer);

    app.get('/api/battery/library/partnumber/:manufacturerName',battery.getAllPartNumber);

    app.get('/api/battery/library/protocol/:manufacturerName/:partnumber',battery.getAvaiableProtocol)
}