module.exports = function(app){
    const rectifier = require('../controller/rectifier.controller.js');

    // // Profile rectifier Router
    app.post('/api/rectifier/profile',rectifier.create);

    app.get('/api/rectifier/profile',rectifier.findAll);

    app.get('/api/rectifier/profile/:profileId',rectifier.findById);

    app.patch('/api/rectifier/profile/:profileId',rectifier.update);

    app.delete('/api/rectifier/profile/:profileId',rectifier.delete);

    // //Dashboard rectifier Router
    // app.get('/api/rectifier/dashboard/:page',rectifier.Dashboard);

    // app.patch('/api/rectifier/dashboard/:profileId', rectifier.DashboardControl);

    // //Get Monitor rectifier By Firmware
    app.patch('/api/rectifier/updatevalue/:profileId',rectifier.updatelatest);

    app.post('/api/rectifier/library', rectifier.addLibrary);

    app.post('/api/rectifier/dataconfig',rectifier.getDataConfig);

    app.get('/api/rectifier/library/manufacturer',rectifier.getAllManufaturer);

    app.get('/api/rectifier/library/partnumber/:manufacturerName',rectifier.getAllPartNumber);

    app.get('/api/rectifier/library/protocol/:manufacturer/:part_number',rectifier.getAvaiableProtocol)
}