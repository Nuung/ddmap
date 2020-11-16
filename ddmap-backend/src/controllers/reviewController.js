'use strict'

const uploadImage = require('../middlewares/uploadToiletImg');
const ReviewService = require('../service/ReviewService');
const { Review } = require('../models');


const registerNewReview = async (req, res) => {

    const image = null;

    // if(req.file){
    //     image = req.file.name
    // }

    try {
        const reviewService = new ReviewService(req.body);
        const check = await reviewService.registerReviewData();

        if (check) {
            const data = {
                message: '리뷰 등록에 성공했습니다'
            };
            console.log(data);
            res.status(201).json({ data });
        }
        else {
            const data = {
                message: '리뷰 등록에 실패했습니다.'
            };

            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "리뷰 등록에 실패하였습니다."
        return res.status(401).json({ errorMessage })
    }
}

const findOneReview = async (req, res) => {
    console.log(`----controller: review find by id: ${req.params.id}`);

    try {
        const result = await ReviewService.findOneReview(req.params.id);
        if (result) {
            console.log({ result });
            res.status(201).json({ result });
        }
        else {
            const data = {
                message: '리뷰 등록에 실패했습니다.'
            };
            console.log(data);
            res.status(401).json({ data });
        }

    }
    catch (error) {
        console.log(error);
        const errorMessage = "리뷰 등록에 실패하였습니다."
        return res.status(401).json({ errorMessage });
    }

}

module.exports = { registerNewReview, findOneReview };