module.exports = function(app){
    const comm = require('../controller/comm.controller.js');

    app.post('/api/comm/add', comm.create);

    app.patch('/api/comm/update', comm.update);

    app.get('/api/comm/get', comm.get);
}