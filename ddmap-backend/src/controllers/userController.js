'use strict';

const UserService = require('../service/UserService')


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
                var iconValue = ''; 

                if (profile_icon == 1){
                     iconValue = 'character1.jpg'

                }else if (profile_icon == 2){
                     iconValue = 'character2.jpg'
                }

            // profile_icon의 경우 번호를 입력받아서 기존 데이터베이스에 저장 된 
            // 이미지 주소를 매칭시켜서 저장해주는게 나을듯 

            await userService.saveUserByLocalId({
                id
                ,profile_icon : iconValue
                ,salt : encryptPasswd.salt
                ,nic_name
                ,gender
                ,password : encryptPasswd.encryptedPasswd   
            })
        
        
            const data = {
                message: '회원가입에 성공했습니다'
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

    //여기 로직 
    try{

        const {
            body:{
                id,
                password
            } 
        } = req

        const userpw = await userService.findUserByLocalPasswd(id) 
        
        const checkPasswd = await userService.verifyPassword(userpw.salt, userpw.password, password)

        const token =  userService.makeToken(userpw.id)

        if(checkPasswd && id === userpw.id){
            //login 성공 메시지 
            const data = {
                message: '로그인에 성공했습니다.', 
                token
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

// getUserData user의 정보를 가져오는게 필요 할듯 
const getUserData = async(req, res) => {
    
    const id = req.token.userId 

    const userService = new UserService(); 

    const userData =  await userService.getUserDataByLocalId(id)

    if(userData){

        const data = {
            profile_icon : `http://localhost:3000/img/${userData.profile_icon}`,
            nic_name : userData.nic_name, 
            gender : userData.gender, 
        }

        return res.status(201).json({data})
    }else{

        const data = {
            message: '일치하는 유저가 없습니다.'
        }

        return res.status(401).json({data})

    }


}


const kakaoSignin = async (req , res) =>{

    var passport = require('passport');
    var KakaoStrategy = require('passport-kakao').Strategy;
    const env = require('dotenv').config();

    console.log("kakaoLogin")

    passport.authenticate('login-kakao')

    passport.use('login-kakao', new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL :'http://localhost:3000/oauth'
    },

    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);
    }
    
    ))
} 

const kakaoSigncallBack = async (req, res) =>{

    passport.authenticate('login-kakao', {
        successRedirect: '/main', 
        failureRedirect: '/'
    })

}


module.exports = {
    localSignup,
    localSignin,
    getUserData,
    kakaoSignin,
    kakaoSigncallBack
}



