module.exports = function(app){
    const aircond = require('../controller/aircond.controller.js');

    // // Profile rectifier Router
    app.post('/api/aircond/profile',aircond.create);

    app.get('/api/aircond/profile',aircond.findAll);

    app.get('/api/aircond/profile/:profileId',aircond.findById);

    app.patch('/api/aircond/profile/:profileId',aircond.update);

    app.delete('/api/aircond/profile/:profileId',aircond.delete);

    // //Dashboard rectifier Router
    // app.get('/api/rectifier/dashboard/:page',rectifier.Dashboard);

    // app.patch('/api/rectifier/dashboard/:profileId', rectifier.DashboardControl);

    // //Get Monitor rectifier By Firmware
    // app.patch('/api/aircond/updatevalue/:profileId',aircond.updatelatest);

    app.post('/api/aircond/library',aircond.addLibrary);

    app.post('/api/aircond/dataconfig',aircond.getDataConfig);

    app.get('/api/aircond/dashboard/:idProfile',aircond.getWillMount);

    app.get('/api/aircond/library/manufacturer',aircond.getAllManufaturer);

    app.get('/api/aircond/library/partnumber/:manufacturerName',aircond.getAllPartNumber);

    app.get('/api/aircond/library/protocol/:manufacturer/:part_number',aircond.getAvaiableProtocol)
}