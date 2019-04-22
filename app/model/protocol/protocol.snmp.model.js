module.exports = (sequelize, Sequelize) => {
    const SNMP = sequelize.define('SNMP', {
        ipaddress : {
            type: Sequelize.STRING
        },
        port : {
            type: Sequelize.STRING
        },
        snmpVersion : {
            type: Sequelize.STRING
        },
        writeCommunity : {
            type: Sequelize.STRING
        },
        readCommunity : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return SNMP;
}