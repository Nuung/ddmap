
module.exports = (sequelize, dataTypes) =>(

    sequelize.define('rank', {
        id :{
            type: dataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true,
            allowNull: false,
            uniuqe: true 
        },
        review_number: {
            type: dataTypes.INTEGER, 
            allowNull: true
        }, 
        review_avg_star : {
            type: dataTypes.DOUBLE, 
            allowNull:false
        }
    })

);