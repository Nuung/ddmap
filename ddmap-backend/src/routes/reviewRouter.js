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
        findOneReviewByToiletId, 
        findReviewsByUserId 
    } = require('../controllers/reviewController');

    // create reivew
    app.use('/review', verifyToken);
    app.route('/review').post(validateReviewCreate, registerNewReview);

    // find all reviews by userId
    app.use('/reviews', verifyToken);
    app.route('/reviews/:id').get(findReviewsByUserId);
};



