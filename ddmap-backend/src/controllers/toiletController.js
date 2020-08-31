'use strict'

const uploadImage = require('../../middlewares/uploadToiletImg')

const uploadToiletImage =  async ( req , res ) =>{

    console.log("UserPostTest")

    const {
        body:{
            toliet_img,
        } 
    } = req

    try{
        const exImage = await uploadImage.uploadToiletImg(body.toliet_img)

        if(exImage){
            const data = {
                message: '이미지 업로드에 성공했습니다.'
              }
              console.log(data)
     
              res.status(201).json({data})
        }else{
            
              const errorMessage = '이미 가입 된 사용자 입니다.'
              return res.status(400).json({errorMessage})

        }
    }catch(error){
        console.log(error); 
        throw new Error(error);
    }

}