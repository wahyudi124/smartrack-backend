module.exports = (sequelize, Sequelize) => {
    const Library = sequelize.define('ups_lib', {
        manufacturer : {
            type: Sequelize.STRING
        },
        part_number : {
            type: Sequelize.STRING
        },
        protocol : {
            type: Sequelize.STRING
        },
        available_data : {
            type: Sequelize.TEXT('long')
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Library;
}