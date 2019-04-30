var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())


const swaggerUI = require('swagger-ui-express');
const swagerDocument = require('./swagger.json');

var options = {
	explorer : true
};

app.use('/api/v1', swaggerUI.serve, swaggerUI.setup(swagerDocument, options));

// app.use((req,res,next)=> {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// //all other requests are not implemented.
// app.use((err,req, res, next) => {
//  res.status(err.status || 501);
//  res.json({
//      error: {
//          code: err.status || 501,
//          message: err.message
//      }
//  });
// });

const db = require('./app/config/db.config.js');
const Role = db.role;
  
//force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initial();   
// });

require('./app/router/io.router.js')(app);
require('./app/router/sensor.router.js')(app);
require('./app/router/rectifier.router.js')(app);
require('./app/router/auth.router.js')(app);
require('./app/router/ups.router.js')(app)
require('./app/router/aircond.router.js')(app);
require('./app/router/battery.router.js')(app)
require('./app/router/comm.router.js')(app);
require('./app/router/setting.router.js')(app);
require('./app/router/battery.router.js')(app);
require('./app/router/pdu.router.js')(app);
require('./app/router/comm.router')(app);
 
// Create a Server
var server = app.listen(5005, function () {
 
  var host = server.address().address
  var port = server.address().port
  
  console.log("App listening at http://%s:%s", host, port)
})

const io = require('./socketio.js').init(server);
  console.log('Test');
io.on('connection', socket => {
    console.log('Client Connected');
})

// console.log('Test');



// console.log('Test');

function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}

