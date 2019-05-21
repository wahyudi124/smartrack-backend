module.exports = (sequelize, Sequelize) => {
    const act = sequelize.define('action_backend', {
        action : {
            type: Sequelize.TEXT('long')
        },
    },
    {
        timestamps: false,  // I do want timestamps here
    }
    )

    return act;
}