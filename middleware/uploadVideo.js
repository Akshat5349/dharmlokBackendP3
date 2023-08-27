const multer = require("multer");
const  { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/bootspider",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["video/mp4"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "video",
            filename: `${Date.now()}-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
