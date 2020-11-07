'user strict'

const { _hasPrimaryKeys } = require("sequelize/lib/model");

// const { sequelize } = require(".")
// const { DataTypes } = require("sequelize/types")


module.exports = (sequelize, DataTypes) => (
  
    sequelize.define('users',{
        id:{
            type: DataTypes.STRING(40), 
            allowNull: false, 
            unique: true,
            primaryKey: true
        },
        salt:{
          type: DataTypes.STRING(200),
          allowNull: false,   
        },
        profile_icon : {
            type: DataTypes.STRING(200), 
            allowNUll: true
        },
        nic_name: {
            type: DataTypes.STRING(40), 
            allowNull: false, 
            unique: true 
        }, 
        gender: {
            type: DataTypes.INTEGER, 
            allwoNUll: false
        },
        password: {
            type: DataTypes.STRING(200), 
            allowNUll: false,
        }
    },
    {
        charset:'utf8',
        collate:'utf8_general_ci'
    })
);





