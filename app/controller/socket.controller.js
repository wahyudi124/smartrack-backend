const io = require('../../socketio');

io.getIO.on("rectirier_in_data", data =>{
    io.getIO.in("reactifier_room").emit("rectirier_data",data.newValue)
}) 