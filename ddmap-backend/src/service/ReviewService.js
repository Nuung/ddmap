const ReviewModel = require('../models/ReviewModel')

class ReviewService {

    constructor(data){
        this.ReviewModel = new ReviewModel(data);
    }

    async registerReviewData(){
        try{
            console.log("----service: review register");
            const review = await this.ReviewModel.registerNewReview();
            return review;
            
        } catch(error){
            console.log("Service registerReviewData: " + error);
            throw new Error(error);
        }
    }

    static async findOneReviewById(id){
        try{
            console.log("----service: review find by id");
            const result = await ReviewModel.findOneReviewById(id);
            return result;
            
        } catch(error){
            console.log("Service findOneReviewById: " + error);
            throw new Error(error);
        }
    }

    static async findOneReviewByToiletId(toiletId){
        try{
            console.log("----service: review find by toilet id");
            const result = await ReviewModel.findOneReviewByToiletId(toiletId);
            return result;
            
        } catch(error){
            console.log("Service findOneReviewByToiletId: " + error);
            throw new Error(error);
        }
    }

    static async findOneReviewByUserId(userId){
        try{
            console.log("----service: review find by user id");
            const result = await ReviewModel.findOneReviewByUserId(userId);
            return result;
            
        } catch(error){
            console.log("Service findOneReviewByUserId: " + error);
            throw new Error(error);
        }
    }
}

module.exports = ReviewService;