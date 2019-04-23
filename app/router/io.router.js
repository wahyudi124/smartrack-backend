module.exports = function(app){
    const io = require('../controller/io.controller.js');

    // Profile IO Router
    app.post('/api/io/profile',io.create);

    app.get('/api/io/profile',io.findAll);

    app.get('/api/io/profile/:profileId',io.findById);

    app.patch('/api/io/profile/:profileId',io.update);

    app.delete('/api/io/profile/:profileId',io.delete);

    //Dashboard IO Router
    app.get('/api/io/dashboard/:page',io.Dashboard);

    app.patch('/api/io/dashboard/:profileId', io.DashboardControl);

    //Get Monitor IO By Firmware
    app.get('/api/io/monitorio/',io.findControlProfile);

}