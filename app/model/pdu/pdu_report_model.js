module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define('pdu_report', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        data : {
            type: Sequelize.STRING
        },
        
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Report;

}