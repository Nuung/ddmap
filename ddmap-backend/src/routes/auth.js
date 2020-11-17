const express = require('express'); 
const bcrypt = require('bcrypt'); 
const User  = require('../models/UserModel'); 
const multer = require('multer'); 

const {
    uploadToiletImg
    } = require('../middlewares/uploadToiletImg')

const {
    localSignup,
    localSignin,
    getUserData,
    kakaoSignin,
    kakaoSigncallBack
} = require('../controllers/userController')

const {
    verifyToken
}  = require('../middlewares/auth')

const {
    registerNewToilet,
    getNearToilets,
    getToiletInfobyId
} = require('../controllers/toiletController')

console.log("appTest")
const router = express.Router();


router.post('/local/signup', localSignup)
router.post('/local/signin', localSignin) 
router.post('/local/upload/image', uploadToiletImg)
router.get('/local/user' ,verifyToken ,getUserData)
router.post('/local/toilet/register' ,uploadToiletImg ,registerNewToilet )
router.get('/toilet/position',getNearToilets)
router.get('/local/toilet/id/:id', getToiletInfobyId)
router.post('/local/login/oauth',kakaoSignin)
router.get('/oauth/kakao/callback',kakaoSigncallBack )
module.exports = router; 
