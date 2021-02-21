const Toilet = require('.').Toilet;
const Bookmark = require('.').Bookmark;

const Sequelize = require('sequelize')
const Op = Sequelize.Op

class ToiletModel {

    async registerNewToilet(data) {
        try {
            await Toilet.create({
                id: data.id,
                name: data.name,
                open_time: data.open_time,
                sex: data.sex,
                latitude: data.latitude,
                longitude: data.longitude,
                image: data.image,
                city_name: data.city_name,
                goo_name: data.goo_name,
                dong_name: data.dong_name,
                street_name: data.street_name,
                street_num_main: data.street_num_main,
                street_num_sub: data.street_num_sub,
                detail: data.detail
            });
            return true
        }
        catch (error) {
            throw new Error(error)
        }
    }

    // query 작성할 일이 없음!!
    async findOneToilet(toilet_id) {
        const toilet = await Toilet.findOne({
            where: {
                id: toilet_id
            }
        });
        return toilet
    }

    // Bookmark가 없으면 "bookmarks": [] / 있으면 "bookmarks": [ 해당 rows return ]
    async findOneToiletWithBookmark(toilet_id, userId) {
        const result = await Toilet.findOne({
            where: {
                id: toilet_id
            },
            include: [
                {
                    model: Bookmark,
                    where: {
                        userId: userId
                    },
                    required: false
                }
            ]
        });
        return result;
    }

    async getNearToiletData(lat, lon) {
        console.log(lon)
        console.log(lat)

        const toilet = await Toilet.findAll({


            // --> and 조건, lat+ 거리 보다 작고 ,lon + 거리보다 작고 
            where: {
                longitude: {
                    [Op.lte]: parseFloat(lon) + 0.01,
                    [Op.gte]: lon - 0.01
                },
                latitude: {
                    [Op.lte]: parseFloat(lat) + 0.01,
                    [Op.gte]: lat - 0.01
                }

            }

        })

        return toilet
    }
}

module.exports = ToiletModel