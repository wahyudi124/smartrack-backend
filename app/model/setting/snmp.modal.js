module.exports = (sequelize, Sequelize) => {
    //SNMP_PROFILE
    const SNMP_profile = sequelize.define('snmp_profile', {
        enable : {
            type: Sequelize.BOOLEAN
        },
        snmp_version : {
            type: Sequelize.ENUM('1','2c')
        },
        snmp_port : {
            type: Sequelize.INTEGER
        },
        read_comunity : {
            type: Sequelize.STRING
        },
        write_comunity : {
            type: Sequelize.STRING
        },
        sysoid : {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    });
    
    //SNMP_MIB
    const SNMP_mib = sequelize.define('snmp_mib', {
        name : {
            type: Sequelize.STRING
        },
        oid : {
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    });




    return SNMP_profile, SNMP_mib;
}