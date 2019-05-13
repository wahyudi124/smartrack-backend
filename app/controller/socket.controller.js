const io = require('../../socketio');

io.getIO.on("rectirier_in_data", data =>{
    io.getIO.emit("rectirier_in_data",data.newValue)
}) 