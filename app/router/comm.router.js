module.exports = function(app){
    const comm = require('../controller/comm.controller.js');

    app.post('/api/comm/add', comm.create);

    app.patch('/api/comm/update/:profileId', comm.update);
}