const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const multer = require('multer');

// --------------- middlewares --------------- //

const {
    uploadToiletImg
} = require('../middlewares/uploadToiletImg');

console.log(" - auth router init - ");
const router = express.Router();


// --------------- toilet --------------- //

const {
    registerNewToilet,
    getNearToilets,
    getToiletInfobyId
} = require('../controllers/toiletController');


router.post('/local/toilet/register', uploadToiletImg, registerNewToilet);

// 이 API를 여러 군대에서 사용해야 하면 upload 이미지를 대표 라우팅 (app js에서 따로 빼내서 또는 파일로 만들어서 또는 미들웨어처럼) 하는 방향이 좋을 것 같습니다.
// router.post('/local/upload/image', uploadToiletImg)
router.post('/local/toilet/register', uploadToiletImg, registerNewToilet)
router.get('/toilet/position', getNearToilets)
router.get('/local/toilet/id/:id', getToiletInfobyId)

module.exports = router; 
