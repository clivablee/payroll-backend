const express = require('express');
const router = express.Router();
const {loginAuth} = require('../controllers/login_controller');
const { dataBirthdays } = require('../controllers/dashboard_controller');


router.post("/login", loginAuth);   
router.post("/dashboard", dataBirthdays);

module.exports = router