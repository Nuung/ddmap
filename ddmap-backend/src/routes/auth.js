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
    getUserData
} = require('../controllers/userController')

const {
    verifyToken
}  = require('../middlewares/auth')

const {
    registerNewToilet
} = require('../controllers/toiletController')

console.log("appTest")
const router = express.Router();


router.post('/local/signup', localSignup)
router.post('/local/signin', localSignin) 
router.post('/local/upload/image', uploadToiletImg)
router.get('/local/user/info' ,verifyToken ,getUserData)
router.post('/local/toilet/register' ,uploadToiletImg ,registerNewToilet )


module.exports = router; 
