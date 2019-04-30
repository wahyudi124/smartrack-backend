module.exports = (sequelize, Sequelize) => {
    const hmi = sequelize.define('hmi_security', {
        mode : {
            type: Sequelize.STRING
        },
        pin : {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    })

    return hmi;
}