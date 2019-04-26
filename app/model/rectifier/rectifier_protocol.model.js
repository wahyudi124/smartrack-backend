module.exports = (sequelize, Sequelize) => {
    const Protocol = sequelize.define('rectifier_protocol', {
        protocolSetting : {
            type: Sequelize.TEXT('long')
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Protocol;
}