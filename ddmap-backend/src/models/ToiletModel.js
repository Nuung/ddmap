const Toilet = require('.').Toilet;
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ToiletModel{

    async registerNewToilet(data){


        try{

            await Toilet.create({
                id: data.id,
                name : data.name, 
                latitude : data.latitude, 
                longitude : data.longitude, 
                image : data.image, 
                goo_name : data.goo_name, 
                dong_name : data.dong_name, 
                street_num_main : data.street_num_main, 
                street_num_sub : data.street_num_sub, 
                detail : data.detail 

            });
            return true
        }
        catch(error){
            throw new Error(error)
        } 
    }

    // query 작성할 일이 없음!!
    async findOneToilet(toilet_id){
       const toilet = await Toilet.findOne({
           where : {
               id: toilet_id
           },
           raw: true 
       })
       return toilet 
    }

    async getNearToiletData(lat, lon){
        console.log(lon)
        console.log(lat)

        const toilet = await Toilet.findAll({
            
        
            // --> and 조건, lat+ 거리 보다 작고 ,lon + 거리보다 작고 
            where : {
                longitude:{
                    [Op.lte]: parseFloat(lon)+1, 
                    [Op.gte]: lon-1
                },
                latitude :{
                    [Op.lte]: parseFloat(lat)+1, 
                    [Op.gte]: lat-1
                }
               
            }

        })

        return toilet 
    }
}

module.exports = ToiletModel