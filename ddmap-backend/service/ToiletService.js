const ToiletModel = require('../models/ToiletModel')

class ToiletService{
    constructor(){
        this.ToiletModel = new ToiletModel();
    }
    async registerToiletData(data){
        try{
            const toilet = await this.ToiletModel.registerNewToilet(data);
            console.log("register22");
            return toilet;
        } catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = ToiletService 