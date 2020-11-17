const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const multer = require('multer');

// --------------- middlewares --------------- //

const {
    uploadToiletImg
} = require('../middlewares/uploadToiletImg');

const {
    verifyToken
} = require('../middlewares/auth');

console.log("-auth router init-");
const router = express.Router();


// 나중에 라우터 분할 다 해야함! 
// --------------- user --------------- //

const {
    localSignup,
    localSignin,
    getUserData,
    kakaoSignin,
    kakaoSigncallBack
} = require('../controllers/userController')

router.post('/local/signup', localSignup);
router.post('/local/signin', localSignin);
router.post('/local/upload/image', uploadToiletImg);
router.get('/local/user/info', verifyToken, getUserData);


// --------------- toilet --------------- //

const {
    registerNewToilet,
    getNearToilets,
    getToiletInfobyId
} = require('../controllers/toiletController')


router.post('/local/toilet/register', uploadToiletImg, registerNewToilet);


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
