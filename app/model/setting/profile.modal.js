module.exports = (sequelize, Sequelize) => {
    //PROFILEE
    const smart_profile = sequelize.define('smartrack_profile', {
        smartrack_name : {
            type: Sequelize.STRING
        },
        address : {
            type: Sequelize.STRING
        },
        longitude : {
            type: Sequelize.DOUBLE
        },
        latitude : {
            type: Sequelize.DOUBLE
        },
        floor : {
            type: Sequelize.INTEGER
        },
        room : {
            type: Sequelize.STRING
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
        installed_date : {
            type: Sequelize.DATEONLY
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    })




    return smart_profile;
}