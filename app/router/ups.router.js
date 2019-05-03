module.exports = function(app){
    const ups = require('../controller/ups.controller.js');

    // // Profile rectifier Router
    app.post('/api/ups/profile',ups.create);

    app.get('/api/ups/profile',ups.findAll);

    app.get('/api/ups/profile/:profileId',ups.findById);

    app.patch('/api/ups/profile/:profileId',ups.update);

    app.delete('/api/ups/profile/:profileId',ups.delete);

    // //Dashboard rectifier Router
    // app.get('/api/rectifier/dashboard/:page',rectifier.Dashboard);

    // app.patch('/api/rectifier/dashboard/:profileId', rectifier.DashboardControl);

    // //Get Monitor rectifier By Firmware
    app.patch('/api/ups/updatevalue/:profileId',ups.updatelatest);

    app.post('/api/ups/library',ups.addLibrary);

    app.post('/api/ups/dataconfig',ups.getDataConfig);

    app.get('/api/ups/library/manufacturer',ups.getAllManufaturer);

    app.get('/api/ups/library/partnumber/:manufacturerName',ups.getAllPartNumber);

    app.get('/api/ups/library/protocol/:manufacturer/:part_number',ups.getAvaiableProtocol)
}