const multer = require('multer')
const path = require('path');
// const { restore } = require('sequelize/lib/model');
const fs = require('fs');

// Multer Config
const options = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
        limits: { fileSize: 200 * 1024 * 1024 },
    })
});


let toiletImageMulter = multer(options).single("toiletimg");

// middleware 본체
const uploadToiletImg = (req, res, next) => {
    fs.readdir('uploads', (error) => { // read directory
        if (error) {
            console.error('upload폴더가 없어서 폴더를 생성합니다.')
            fs.mkdirSync('uploads');
        }
    });

    try {
        toiletImageMulter(req, res, error => {
            if (error) {
                console.log(error)
                return res.status(500).json({ error });
            }
            // if(!req.file){
            //     const errorMessage = '파일이 존재하지 않습니다.'
            //     res.status(500).json({errorMessage})
            //     return 
            // }
            return next();
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error });
    }
};

module.exports = { uploadToiletImg };