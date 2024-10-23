const express = require('express');
const router = express.Router();
const {loginAuth} = require('../controllers/login_controller');
const { dataBirthdays, dataYearsOfService } = require('../controllers/dashboard_controller');
const { dataEmployees, dataSelectEmployees, dataAddEmployees } = require('../controllers/employees_controller');
const { verifyToken } = require('../authentication/token_validation');
const { loggedInUser, loggedOutUser } = require('../controllers/drawer_controller');


router.post("/login", loginAuth, loggedInUser);   
router.post("/birthday", verifyToken, dataBirthdays);
router.post("/anniversary", verifyToken, dataYearsOfService);

router.post("/loggedinUser", loggedInUser);
router.post("/logout", loggedOutUser);

//employees
router.post("/employees", dataEmployees);
router.post("/selectEmployee", dataSelectEmployees);
router.post("/addEmployee", dataAddEmployees);




module.exports = router