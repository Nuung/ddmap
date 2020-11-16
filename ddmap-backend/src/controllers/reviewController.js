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
};

const findOneReviewById = async (req, res) => {
    try {
        console.log(`----controller: review find by id: ${req.params.id}`);
        const result = await ReviewService.findOneReviewById(req.params.id);
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
};


const findOneReviewByToiletId = async (req, res) => {
    try {
        console.log(`----controller: review find by toilet id: ${req.params.id}`);
        const result = await ReviewService.findOneReviewByToiletId(req.params.id);
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
};


const findOneReviewByUserId = async (req, res) => {
    try {
        console.log(`----controller: review find by user id: ${req.params.id}`);
        const result = await ReviewService.findOneReviewByUserId(req.params.id);
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
};

module.exports = { registerNewReview, findOneReviewById, findOneReviewByToiletId, findOneReviewByUserId };