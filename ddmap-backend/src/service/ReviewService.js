const ReviewModel = require('../models/ReviewModel')

class ReviewService {

    constructor(){
        this.ReviewModel = new ReviewModel();
    }

    async registerReviewData(data) {
        try {
            console.log("----service: review register");
            const review = await this.ReviewModel.registerNewReview(data);
            return review;

        } catch (error) {
            console.log("Service registerReviewData: " + error);
            throw new Error(error);
        }
    }

    async findOneReviewById(id) {
        try {
            console.log("----service: review find by id");
            const result = await this.ReviewModel.findOneReviewById(id);
            return result;

        } catch (error) {
            console.log("Service findOneReviewById: " + error);
            throw new Error(error);
        }
    }

    async findOneReviewByToiletId(toiletId) {
        try {
            console.log("----service: review find by toilet id");
            const result = await this.ReviewModel.findOneReviewByToiletId(toiletId);
            return result;

        } catch (error) {
            console.log("Service findOneReviewByToiletId: " + error);
            throw new Error(error);
        }
    }

    async findReviewsByUserId(userId) {
        try {
            console.log("----service: review find by user id");
            const result = await this.ReviewModel.findReviewsByUserId(userId);
            return result;

        } catch (error) {
            console.log("Service findReviewsByUserId: " + error);
            throw new Error(error);
        }
    }
}

module.exports = ReviewService;