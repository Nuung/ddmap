'use strict';
// --------------- middlewares --------------- //

// const { uploadToiletImg } = require('../middlewares/uploadToiletImg');
const { validateReviewCreate } = require('../middlewares/validators/reviewValidator');
const verifyToken = require('../middlewares/auth_new');

// --------------- Routing --------------- //

module.exports = (app) => {
    const { 
        registerNewReview, 
        findOneReviewById, 
        findReviewsByToiletId, 
        findReviewsByUserId 
    } = require('../controllers/reviewController');

    // create reivew
    app.use('/review', verifyToken);
    app.route('/review').post(validateReviewCreate, registerNewReview);

    // find all reviews by userId
    app.use('/user/reviews', verifyToken);
    app.route('/user/reviews/:id').get(findReviewsByUserId);

    // find all reviews by toiletId
    app.use('/toilet/reviews', verifyToken);
    app.route('/toilet/reviews/:id').get(findReviewsByToiletId);    
};



