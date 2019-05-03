module.exports = (sequelize, Sequelize) => {
    const time = sequelize.define('time', {
        date: {
            type: Sequelize.DATEONLY
        },
        time: {
            type: Sequelize.TIME
        },
        sntp_enable: {
            type: Sequelize.BOOLEAN
        },
        sntp_prim_address: {
            type: Sequelize.STRING
        },
        sntp_back_address: {
            type: Sequelize.STRING
        },
        udp_port: {
            type: Sequelize.INTEGER
        },
        poll_interval: {
            type: Sequelize.DOUBLE
        }
    },
    {
        timestamps: false,
    })

    return time;
}