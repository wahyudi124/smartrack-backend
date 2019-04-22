module.exports = (sequelize, Sequelize) => {
    const ModbusRTU = sequelize.define('modbus_rtu', {
        com : {
            type: Sequelize.STRING
        },
        address : {
            type: Sequelize.STRING
        },
        endianness : {
            type: Sequelize.STRING
        },
        baudrate : {
            type: Sequelize.STRING
        },
        stopBit : {
            type: Sequelize.STRING
        },
        byteSize : {
            type: Sequelize.STRING
        },
        parity : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return ModbusRTU;
}