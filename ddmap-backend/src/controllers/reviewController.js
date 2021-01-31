'use strict'
const ReviewService = require('../service/ReviewService');
const { Review } = require('../models');


const registerNewReview = async (req, res) => {

    try {
        const reviewService = new ReviewService();
        const check = await reviewService.registerReviewData(req.body);

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
        const reviewService = new ReviewService();
        console.log(`----controller: review find by id: ${req.params.id}`);
        const result = await reviewService.findOneReviewById(req.params.id);
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


const findReviewsByToiletId = async (req, res) => {
    try {
        const reviewService = new ReviewService();
        console.log(`----controller: review find by toilet id: ${req.params.id}`);
        const result = await reviewService.findReviewsByToiletId(req.params.id);
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


const findReviewsByUserId = async (req, res) => {
    try {
        const reviewService = new ReviewService();
        console.log(`----controller: review find by user id: ${req.params.id}`);
        const result = await reviewService.findReviewsByUserId(req.params.id);
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

module.exports = { registerNewReview, findOneReviewById, findReviewsByToiletId, findReviewsByUserId };