const Review = require('.').Review;

class ReviewModel {

    constructor(data) {
        this.id = data.id;
        this.toiletId = data.toiletId;
        this.userId = data.userId;
        this.title = data.title;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.image = data.image;
        this.clean_of_toilet = data.clean_of_toilet;
        this.amount_of_tissue = data.amount_of_tissue;
        this.is_old = data.is_old;
        this.is_secret = data.is_secret;
        this.shot_detail = data.shot_detail;
    };


    async registerNewReview() {

        try {
            await Review.create({
                id: this.id,
                toiletId: this.toiletId,
                userId: this.userId,
                title: this.title,
                latitude: this.latitude,
                longitude: this.longitude,
                image: this.image,
                clean_of_toilet: this.clean_of_toilet,
                amount_of_tissue: this.amount_of_tissue,
                is_old: this.is_old,
                is_secret: this.is_secret,
                shot_detail: this.shot_detail
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    static async findOneReviewById(id) {
        try {
            console.log(`----model: review find by id: ${id}`);
            const review = await Review.findAll({
                where: {
                    id
                },
                raw: true
            });
            return review;
        } catch (error) {
            throw new Error("Model findOneReviewById: " + error);
        }
    }

    static async findOneReviewByToiletId(toiletId) {
        try {
            console.log(`----model: review find by toilet id: ${toiletId}`);
            const review = await Review.findAll({
                where: {
                    toiletId
                },
                raw: true
            });
            return review;
        } catch (error) {
            throw new Error("Model findOneReviewBytoiletId: " + error);
        }
    }

    static async findOneReviewByUserId(userId) {
        try {
            console.log(`----model: review find by user id: ${userId}`);
            const review = await Review.findAll({
                where: {
                    userId
                },
                raw: true
            });
            return review;
        } catch (error) {
            throw new Error("Model findOneReviewByuserId: " + error);
        }
    }

    // Getter And Setter

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }
}

module.exports = ReviewModel;