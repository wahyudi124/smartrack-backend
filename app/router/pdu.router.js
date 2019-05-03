module.exports = function(app){
    const pdu = require('../controller/pdu.controller.js');

    // // Profile rectifier Router
    app.post('/api/pdu/profile',pdu.create);

    app.get('/api/pdu/profile',pdu.findAll);

    app.get('/api/pdu/profile/:profileId',pdu.findById);

    app.patch('/api/pdu/profile/:profileId',pdu.update);

    app.delete('/api/pdu/profile/:profileId',pdu.delete);

    // //Dashboard rectifier Router
    // app.get('/api/rectifier/dashboard/:page',rectifier.Dashboard);

    // app.patch('/api/rectifier/dashboard/:profileId', rectifier.DashboardControl);

    // //Get Monitor rectifier By Firmware
    app.patch('/api/pdu/updatevalue/:profileId',pdu.updatelatest);

    app.post('/api/pdu/library',pdu.addLibrary);

    app.post('/api/pdu/dataconfig',pdu.getDataConfig);

    app.get('/api/pdu/library/manufacturer',pdu.getAllManufaturer);

    app.get('/api/pdu/library/partnumber/:manufacturerName',pdu.getAllPartNumber);

    app.get('/api/pdu/library/protocol/:manufacturer/:part_number',pdu.getAvaiableProtocol)
}