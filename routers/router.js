const express = require('express');
const router = express.Router();
const {loginAuth} = require('../controllers/login_controller');
const { dataBirthdays, dataYearsOfService } = require('../controllers/dashboard_controller');
const { dataEmployees, dataSelectEmployees, dataAddEmployees } = require('../controllers/employees_controller');


router.post("/login", loginAuth);   
router.post("/birthday", dataBirthdays);
router.post("/anniversary", dataYearsOfService);

//employees
router.post("/employees", dataEmployees);
router.post("/selectEmployee", dataSelectEmployees);
router.post("/addEmployee", dataAddEmployees);




module.exports = router