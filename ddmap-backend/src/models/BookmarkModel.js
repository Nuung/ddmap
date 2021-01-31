const Bookmark = require('.').Bookmark;

class BookmarkModel {

    async registerNewBookmark(data) {
        try {
            await Bookmark.create({
                userId: data.userId,
                toiletId: data.toiletId
            });
            return true;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async findBookmarksByToiletId(toiletId) {
        try {
            console.log(`----model: bookmark find by toilet id: ${toiletId}`);
            const bookmark = await Bookmark.findAll({
                where: {
                    toiletId
                },
                raw: true
            });
            return bookmark;
        } 
        catch (error) {
            throw new Error("Model findBookmarksByToiletId: " + error);
        }
    }

    async findBookmarksByUserId(userId) {
        try {
            console.log(`----model: bookmark find by user id: ${userId}`);
            const bookmark = await Bookmark.findAll({
                where: {
                    userId
                },
                raw: true
            });
            return bookmark;
        } 
        catch (error) {
            throw new Error("Model findBookmarksByuserId: " + error);
        }
    }
}

module.exports = BookmarkModel;