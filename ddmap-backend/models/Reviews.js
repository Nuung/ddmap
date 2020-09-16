
module.exports = (sequelize, DataTypes) => (

    sequelize.define('reviews',{
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false, 
            unique: true, 
            primaryKey: true, 
            autoIncrement: true 
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true, 
            unique: false 
        },
        latitude: {
            type: DataTypes.DOUBLE, 
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE, 
            allowNull: false 
        },
        image: {
            type: DataTypes.STRING(200), 
            allowNull: true, 
        },
        clean_of_toilet : {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        amount_of_tissue: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        is_old : {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        is_secret: {
            type: DataTypes.INTEGER, 
            allowNull: false 
        }, 
        shot_detail : {
            type: DataTypes.STRING(200), 
            allowNull: true
        }
    })

);