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
            
            // profile_icon의 경우 번호를 입력받아서 기존 데이터베이스에 저장 된 
            // 이미지 주소를 매칭시켜서 저장해주는게 나을듯 

            await userService.saveUserByLocalId({
                id
                ,profile_icon
                ,salt : encryptPasswd.salt
                ,nic_name
                ,gender
                ,password : encryptPasswd.encryptedPasswd   
            })
            
            const userId = await userService.findUserByLocalId(id)
            const token =  userService.makeToken(userId)

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

const localSignin = async (req , res ) => {
    const userService = new UserService(); 

    const {

        body :{
            id,
            password,
        }
    } = req

    //여기 로직 
    try{
        
        const userpw = await userService.findUserByLocalPasswd(id) 

        const checkPasswd = await userService.verifyPassword(userpw.salt, userpw.password, password)

        if(checkPasswd && id === userpw.id){
            //login 성공 메시지 
            const data = {
                message: '로그인에 성공했습니다.'
            }

            return res.status(201).json({data})

        }else{

            const data = {
                message: '비밀번호 또는 아이디가 일치하지 않습니다.'
            }

            return res.status(401).json({data})

        }
        


    }catch(error){

    }

}


module.exports = {
    localSignup,
    localSignin
}



