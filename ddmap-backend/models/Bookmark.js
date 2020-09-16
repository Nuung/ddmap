
module.exports = (sequelize, dataTypes) =>(

    sequelize.define('bookmark', {
        index :{
            type: dataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false,
            uniuqe: true 
        },
        user_id: {
            type: dataTypes.STRING, 
            allowNull: true
        }, 
        toilet_id : {
            type: dataTypes.DOUBLE, 
            allowNull:false
        }
    })

);