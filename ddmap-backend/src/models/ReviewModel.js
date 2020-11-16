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

    // query 작성할 일이 없음!!
    static async findOneReview(id) {
        console.log(`----model: review find by id: ${id}`);
        const review = await Review.findAll({
            where: {
                id
            },
            raw: true
        })
        return review
    }
}

module.exports = ReviewModel;