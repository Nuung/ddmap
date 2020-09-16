
const Toilet = require('.').Toilet

class ToiletModel{


    async registerNewToilet(data){

        console.log("register33")

        try{
            Toilet.create({
                name : data.name, 
                latitude : data.latitude, 
                longitude : data.longitude, 
                image : data.image, 
                goo_name : data.goo_name, 
                dong_name : data.dong_name, 
                street_num_main : data.street_num_main, 
                street_num_sub : data.street_num_sub, 
                detail : data.detail 
            } )
            
            return true 

        }catch(error){

            throw new Error(error)
             
        }
       
      
    }

<<<<<<< HEAD

=======
    // query 작성할 일이 없음!!
>>>>>>> 636cb6d736d3e922ff3e3a46224ffccea44cc5a2
    async findOneToilet(toilet_id){
       const toilet = await Toilet.findAll({
           where : {
               toilet_id
           },
           raw: true 
       })
       return toilet 
    }
}

module.exports = ToiletModel