const Review = require('.').Review;

class ReviewModel {

    async registerNewReview(data) {
        try {
            await Review.create({
                id: data.id,
                toiletId: data.toiletId,
                userId: data.userId,
                title: data.title,
                latitude: data.latitude,
                longitude: data.longitude,
                image: data.image,
                clean_of_toilet: data.clean_of_toilet,
                amount_of_tissue: data.amount_of_tissue,
                is_old: data.is_old,
                is_secret: data.is_secret,
                shot_detail: data.shot_detail
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async findOneReviewById(id) {
        try {
            console.log(`----model: review find by id: ${id}`);
            const review = await Review.findAll({
                where: {
                    id
                },
                raw: true
            });
            return review;
        } 
        catch (error) {
            throw new Error("Model findOneReviewById: " + error);
        }
    }

    async findOneReviewByToiletId(toiletId) {
        try {
            console.log(`----model: review find by toilet id: ${toiletId}`);
            const review = await Review.findAll({
                where: {
                    toiletId
                },
                raw: true
            });
            return review;
        } 
        catch (error) {
            throw new Error("Model findOneReviewBytoiletId: " + error);
        }
    }

    async findReviewsByUserId(userId) {
        try {
            console.log(`----model: review find by user id: ${userId}`);
            const review = await Review.findAll({
                where: {
                    userId
                },
                raw: true
            });
            return review;
        } 
        catch (error) {
            throw new Error("Model findOneReviewByuserId: " + error);
        }
    }
}

module.exports = ReviewModel;