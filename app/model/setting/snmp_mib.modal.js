module.exports = (sequelize, Sequelize) => {
    
    //SNMP_MIB
    const SNMP_mib = sequelize.define('snmp_mib', {
        list_MIB : {
            type: Sequelize.TEXT('long')
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    });




    return SNMP_mib;
}