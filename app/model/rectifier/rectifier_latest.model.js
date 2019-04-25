module.exports = (sequelize, Sequelize) => {
    const Latest = sequelize.define('rectifier_latest', {
        timestamp : {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW 
        },
        var_name : {
            type: Sequelize.STRING
        },
        value : {
            type : Sequelize.STRING
        },
        unit : {
            type : Sequelize.STRING
        },
        read_this : {
            type : Sequelize.BOOLEAN
        },
        write_this : {
            type : Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Latest;
}