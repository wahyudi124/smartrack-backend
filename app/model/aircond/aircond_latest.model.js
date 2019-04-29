module.exports = (sequelize, Sequelize) => {
    const Latest = sequelize.define('aircond_latest', {
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
            type : Sequelize.INTEGER
        },
        write_this : {
            type : Sequelize.INTEGER
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Latest;
}