const ToiletModel = require('../models/ToiletModel')

class ToiletService{

    constructor(){
        this.ToiletModel = new ToiletModel();
    }

    async registerToiletData(data){
        
        console.dir(data);

        try{
            const toilet = await this.ToiletModel.registerNewToilet(data);
    
            return toilet;
            
        } catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async getNearToilets(lat, lon){
        
        try{
            const toilet = await this.ToiletModel.getNearToiletData(lat , lon); 

            return toilet 

        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    async getToiletInfobyId(toiletId){

        try{
            const toilet = await this.ToiletModel.findOneToilet(toiletId);

            return toilet
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }



}

module.exports = ToiletService 