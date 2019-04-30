module.exports = (sequelize, Sequelize) => {
    const Log = sequelize.define('log', {
        eventlog_max_entries : {
            type: Sequelize.INTEGER
        },
        datalog_max_entries : {
            type: Sequelize.STRING
        },
        normal_interval : {
            type: Sequelize.DOUBLE
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    })

    return Log;
}