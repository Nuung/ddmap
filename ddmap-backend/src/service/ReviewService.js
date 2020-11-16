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
            console.log(error);
            throw new Error(error);
        }
    }

    static async findOneReview(targetId){
        try{
            console.log("----service: review find by id");
            const result = await ReviewModel.findOneReview(targetId);
            return result;
            
        } catch(error){
            console.log(error);
            throw new Error(error);
        }
    }
}

module.exports = ReviewService;