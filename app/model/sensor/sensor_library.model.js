module.exports = (sequelize, Sequelize) => {
    const Library = sequelize.define('sensor_lib', {
        type : {
            type: Sequelize.STRING
        },
        avaiable_data : {
            type: Sequelize.TEXT('long')
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    
    )

    return Library;
}

