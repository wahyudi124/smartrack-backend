module.exports = function(app){
    const asset = require('../controller/asset.controller.js');

    // Profile Asset Router
    app.post('/api/asset/profile',asset.create);

    app.get('/api/asset/profile',asset.findAll);

    app.get('/api/asset/profile/:profileId',asset.findById);

    app.patch('/api/asset/profile/:profileId',asset.update);

    app.delete('/api/asset/profile/:profileId',asset.delete);

    //Dashboard asset Router
    app.get('/api/asset/dashboard/:page',asset.Dashboard);

    app.patch('/api/asset/dashboard/:profileId', asset.DashboardControl);

    //Get Monitor asset By Firmware
    app.get('/api/asset/monitorio/',asset.findControlProfile);

}