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
    getUserData
} = require('../controllers/userController');

router.post('/local/signup', localSignup);
router.post('/local/signin', localSignin);
router.post('/local/upload/image', uploadToiletImg);
router.get('/local/user/info', verifyToken, getUserData);


// --------------- toilet --------------- //

const {
    registerNewToilet
} = require('../controllers/toiletController');


router.post('/local/toilet/register', uploadToiletImg, registerNewToilet);


// --------------- review --------------- //

const {
    registerNewReview,
    findOneReviewById,
    findOneReviewByToiletId,
    findOneReviewByUserId
} = require('../controllers/reviewController');

router.post('/local/user/review', uploadToiletImg, registerNewReview);
router.get('/local/review/:id', findOneReviewById);
router.get('/local/toilet/review/:id', findOneReviewByToiletId);
router.get('/local/user/review/:id', findOneReviewByUserId);


module.exports = router; 
