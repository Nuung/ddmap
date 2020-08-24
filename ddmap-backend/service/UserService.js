
const Usermodel = require('../models/UserModel')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//서비스는 유저와 관련 된 함수를 구현하는 파트 
class UserService{
    
    constructor(){
        this.Usermodel = new Usermodel()
    }

    //create token --> 유저 생성과 동시에 토큰 발행 
    makeToken (id) {
        const token = jwt.sign(
            {
            id
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn : 365 * 24 * 60 * 60, 
            issuer: 'ddmap'
        }
    )
        return token
    }

    encryptPasswd (password) {
        try{
            const salt = crypto.randomBytes(64).toString('base64')
            const encryptedPasswd = crypto
            .pbkdf2Sync(password, salt, 10000, 64 , 'sha512')
            .toString('base64')

            const encryptInfo = {
                salt,
                encryptedPasswd
            }
            return encryptInfo
        }catch( error){
            console.log(error)
            return new Error(error) 
        }
    }

    verifyPassword(salt, password, passwordToVerify){
        try{
            console.log('verifyPassword')
            const encryptedPasswdToVerify = crypto
            .pbkdf2Sync(passwordToVerify, salt, 10000, 64,'sha512')
            .toString('base64')

            if(encryptedPasswdToVerify === password){
                return true
            }else{
                return false 
            }
        } catch(error){
            console.log(error)
            throw new Error(error)
        }

    }

    async findUserByLocalId(local_id){

        try{
            const user = await this.Usermodel.findUserByLocalId(local_id)
            const userId = user ? user.id : null

            return userId 
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }

    async saveUserByLocalId(data){
        try{
            const user = await this.Usermodel.saveUserByLocalId(data)
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }

    async findUserByLocalPasswd(id){
        try{
            const user = await this.Usermodel.findUserByLocalPassword(id)
        
            return user

        }catch(error){
            console.log(error) 
            throw new Error(error)
        }
    }

}

module.exports = UserService