const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");

const storage = multer.memoryStorage();
const upload = multer ({ storage }) 

module.exports = {
  imageUpload: [upload.single("image"), async (req, res) => {
    try {
      const file = req.file
      const formData = new FormData();
      formData.append("image", file.buffer, file.originalname);

      const response = await axios.post("http://136.158.149.110:5000/upload", formData, {
          headers: formData.getHeaders(), 
        })

      res.status(200).json({
        status: "Success",
        data: response.data
      })

    } catch (error) {
      res.status(500).json({ 
        message: "Error" + error.message 
      });
    }
  }]
};
