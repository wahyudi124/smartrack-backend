module.exports = (sequelize, Sequelize) => {
    const ModbusTCP = sequelize.define('modbus_tcp', {
        ipaddress : {
            type: Sequelize.STRING
        },
        endianness : {
            type: Sequelize.STRING
        },
        port : {
            type: Sequelize.STRING
        },
        timeout : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return ModbusTCP;
}