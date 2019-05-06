module.exports = (sequelize, Sequelize) => {
    const asset = sequelize.define('asset_profile', {
        name : {
            type: Sequelize.STRING
        },
        manufacturer : {
            type: Sequelize.STRING
        },
        part_number: {
            type: Sequelize.STRING
        },
        supplier: {
            type: Sequelize.STRING
        },
        supplier_contract: {
            type: Sequelize.STRING
        },
        installed_by: {
            type: Sequelize.STRING
        },
        installation_date: {
            type: Sequelize.DATEONLY
        },
        description: {
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    
    )

    return asset;
}
