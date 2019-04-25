module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('rectifier_profile', {
        name : {
            type: Sequelize.STRING
        },
        manufacturer : {
            type: Sequelize.STRING
        },
        part_number : {
            type: Sequelize.STRING
        },
        serial_number : {
            type: Sequelize.STRING
        },
        protocol : {
            type: Sequelize.TEXT('long')
        },
        supplier : {
            type: Sequelize.STRING
        },
        supplier_contact : {
            type: Sequelize.STRING
        },
        installed_by : {
            type: Sequelize.STRING
        },
        installation_date : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Profile;
}