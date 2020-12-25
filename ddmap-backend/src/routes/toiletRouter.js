'use strict';
// --------------- middlewares --------------- //

const { uploadToiletImg } = require('../middlewares/uploadToiletImg');
// const { verifyToken } = require('../middlewares/auth');
const verifyToken = require('../middlewares/auth_new');

// --------------- Routing --------------- //

module.exports = (app) => {
    const {
        registerNewToilet,
        getNearToilets,
        getToiletInfobyId
    } = require('../controllers/toiletController');


    app.route('/local/toilet/register').post(uploadToiletImg, registerNewToilet);

    // 이 API를 여러 군대에서 사용해야 하면 upload 이미지를 대표 라우팅 (app js에서 따로 빼내서 또는 파일로 만들어서 또는 미들웨어처럼) 하는 방향이 좋을 것 같습니다.
    // router.post('/local/upload/image', uploadToiletImg)
    
    app.route('/local/toilet/register').post(uploadToiletImg, registerNewToilet)
    app.route('/toilet/position').get(getNearToilets)
    app.route('/local/toilet/id/:id').get(getToiletInfobyId)
};



