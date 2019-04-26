module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('sensor_profile', {
        name : {
            type: Sequelize.STRING
        },
        type : {
            type: Sequelize.STRING
        },
        address : {
            type: Sequelize.STRING
        },
        AES128_key : {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return Profile;
}