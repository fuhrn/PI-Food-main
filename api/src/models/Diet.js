const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('diet', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        timestamps: false
    });
};