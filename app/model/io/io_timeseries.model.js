module.exports = (sequelize, Sequelize) => {
    const TimeSeries = sequelize.define('io_timeseries', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        value : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    
    )

    return TimeSeries;
}