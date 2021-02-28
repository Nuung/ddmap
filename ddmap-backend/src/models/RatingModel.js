const Rating = require('.').Rating;

class RatingModel {

    async registerNewRating(data) {
        try {
            await Rating.create({
                toiletId: data.toiletId,
                userId: data.userId,
                rate: data.rate
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async findAllRatingByToiletId(toiletId) {
        try {
            console.log(`----model: rating find by toiletId: ${toiletId}`);
            const rating = await Rating.findAll({
                where: { id }
            });
            return rating;
        }
        catch (error) {
            throw new Error("Model findAllRatingByToiletId: " + error);
        }
    }

    async findAllRatingByUserId(userId) {
        try {
            console.log(`----model: rating find by UserId: ${userId}`);
            const rating = await Rating.findAll({
                where: { userId }
            });
            return rating;
        }
        catch (error) {
            throw new Error("Model findAllRatingByUserId: " + error);
        }
    }
}

module.exports = RatingModel;