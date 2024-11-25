const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "//136.158.149.110/Users/Administrator/Desktop/Images";
    console.log("Destination Path: ", path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = {
  imageUpload: [upload.single("image"),(req, res) => {
      try {
        res.status(200).json({
            status: "Success",
            data: req.file
        })
      } catch (error) {
        res.status(500).json({
            status: "Error",
            error: "An error occurred while uploading the file"
        })
      }
    },
  ],
};
