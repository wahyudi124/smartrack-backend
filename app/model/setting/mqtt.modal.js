module.exports = (sequelize, Sequelize) => {
    const MQTT = sequelize.define('mqtt', {
        enable : {
            type: Sequelize.BOOLEAN
        },
        broker_address : {
            type: Sequelize.STRING
        },
        broker_port : {
            type: Sequelize.INTEGER
        },
        username : {
            type: Sequelize.STRING
        },
        password : {
            type: Sequelize.STRING
        },
        pubtopic : {
            type: Sequelize.STRING
        },
        retain : {
            type: Sequelize.BOOLEAN
        },
        qos : {
            type: Sequelize.INTEGER
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    })

    return MQTT;
}