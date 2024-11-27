const multer = require("multer");
const FormData = require("form-data");
const axios = require("axios");
const { addEmployeeQuery } = require("../services/employees_service");

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
      });

      res.status(200).json({
        status: "Success",
        data: response.data
      })

      imagePath = response.data.filePath
      console.log(imagePath)

    } catch (error) {
      res.status(500).json({ 
        message: "Error: " + error 
      });
    }
  }],

  loadImage: [upload.single("image"), async (req, res) => {
    try {
      const file = req.file
      const formData = new FormData();
      formData.append("image", file.buffer, file.originalname);

      const response = await axios.post("http://136.158.149.110:5000/upload", formData, {
          headers: formData.getHeaders(), 
      });

      const imagePath = response.data.filePath

      res.status(200).send(imagePath)
      console.log(imagePath)

    } catch (error) {
      res.status(500).json({ 
        message: "Error: " + error 
      });
    }
  }],
      
  create: async (req,res) => {
    try {
        const response = await addEmployeeQuery(req.body, imagePath)
        console.log("Response", response)
        return res.status(200).json({
            status: "success",
            data: response
        })
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Error: "+ error
      })
    }

  }


};
