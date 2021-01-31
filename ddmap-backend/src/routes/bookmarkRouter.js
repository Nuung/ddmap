'use strict';
// --------------- middlewares --------------- //

const verifyToken = require('../middlewares/auth_new');

// --------------- Routing --------------- //

module.exports = (app) => {
    const { 
        registerNewBookmark, 
        findBookmarksByToiletId, 
        findBookmarksByUserId 
    } = require('../controllers/bookmarkController');

    // create reivew
    app.use('/bookmark', verifyToken);
    app.route('/bookmark').post(registerNewBookmark);

    // find all bookmarks by userId
    app.use('/user/bookmarks', verifyToken);
    app.route('/user/bookmarks/:id').get(findBookmarksByUserId);

    // find all bookmarks by toiletId
    app.use('/toilet/bookmarks', verifyToken);
    app.route('/toilet/bookmarks/:id').get(findBookmarksByToiletId);    
};



