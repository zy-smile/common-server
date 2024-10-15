const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
// 设置文件存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'document/uploads/'); // 设置文件存储的目录
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // 设置文件名
    }
});
const upload = multer({
    storage: storage
});
router.post('/image', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    let fileUrl = path.join('/uploads',req.file.filename)
    res.send({
        errno: 0,
        data: {
            url: fileUrl
        }
    });
});
router.get('/url', (req, res) => {
    res.send({
        errno: 0,
        data: {
            url: '123213'
        }
    });
});
module.exports = router