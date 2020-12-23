'use strict';
// --------------- middlewares --------------- //

const { uploadToiletImg } = require('../middlewares/uploadToiletImg');
// const { verifyToken } = require('../middlewares/auth');
const verifyToken = require('../middlewares/auth_new');

// --------------- Routing --------------- //

module.exports = (app) => {
    const {
        localSignup,
        localSignin,
        getUserData,
        kakaoSignin,
        kakaoSigncallBack
    } = require('../controllers/userController');

    app.route('/local/signup').post(localSignup);
    app.route('/local/signin').post(localSignin);

    // app.use('/local/user/info', verifyToken);
    app.use('/local/user', verifyToken);
    app.route('/local/user').get(getUserData);
    
    app.route('/local/upload/image').post(uploadToiletImg);
    app.route('/local/login/oauth').post(kakaoSignin);
    app.route('/oauth/kakao/callback').get(kakaoSigncallBack);
};



