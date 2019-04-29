module.exports = (sequelize, Sequelize) => {
    const comm = sequelize.define('communication', {
        eth_dhcp: {
            type: Sequelize.BOOLEAN
        },
        eth_ipaddress: {
            type: Sequelize.STRING
        },
        eth_netmask: {
            type: Sequelize.STRING
        },
        eth_gateway: {
            type: Sequelize.STRING
        },
        wifi_ssid: {
            type: Sequelize.STRING
        },
        wifi_password: {
            type: Sequelize.STRING
        },
        wifi_dhcp: {
            type: Sequelize.BOOLEAN
        },
        wifi_ipaddress: {
            type: Sequelize.STRING
        },
        wifi_netmask: {
            type: Sequelize.STRING
        },
        wifi_gateway: {
            type: Sequelize.STRING
        }

    },
    {
        timestamps: false,
    })

    return comm;
}