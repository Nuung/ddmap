'use strict'

const uploadImage = require('../../middlewares/uploadToiletImg.js')
const ToiletService = require('../../service/ToiletService')
const { Toilet } = require('../../models')


const registerNewToilet =  async (req, res) =>{

     const image = null

    // if(req.file){
    //     image = req.file.name
    // }

    console.log("filenae " + req.file.filename) 
  
    const {
            name,
            latitude, 
            longitude, 
            goo_name,
            dong_name,
            street_num_main,
            street_num_sub,
            detail,
    } = req.body


    const toilet = {name, latitude, longitude, goo_name, dong_name,
    street_num_main, street_num_sub, detail, image}

    try{
        const toiletService = new ToiletService(); 

        const check =  await toiletService.registerToiletData(toilet)
        
        if(check){
            const data = {
                message: '화장실 등록에 성공했습니다'
              }
    
              console.log(data)

            res.status(201).json({data})
        }else{

             const data = {

                message: '화장실 등록에 실패했습니다.'

              }
    
              console.log(data)
              
            res.status(401).json({data})
        }

    }catch(error){
        
        const errorMessage = "등록에 실패하였습니다."
        return res.status(401).json({errorMessage})
    }

}

module.exports = {registerNewToilet}