'use strict'
const UserService = require('../../service/UserService')


const localSignup =  async ( req , res ) =>{
    const userService = new UserService();
    console.log("UserPostTest")
    
    const {
        body:{
            id,
            profile_icon,
            nic_name,
            gender,
            password,
        } 
    } = req

    try{
        const exUserId = await userService.findUserByLocalId(id)

        if(exUserId){
            const errorMessage = '이미 가입 된 사용자 입니다.'
            return res.status(400).json({errorMessage})
        }else{

            const encryptPasswd = userService.encryptPasswd(password)
            await userService.saveUserByLocalId({
                id
                ,profile_icon
                ,nic_name
                ,gender
                ,password : encryptPasswd.encryptedPasswd   
            })
            
            const userId = await userService.findUserByLocalId(id)
            const token = await userService.makeToken(userId)

            const data = {
                message: '회원가입에 성공했습니다',
                token
              }
              console.log(data)

              res.status(201).json({data})

        }
    }catch(error){
        console.log(error); 
        throw new Error(error);
    }

}


module.exports = {
    localSignup
}



