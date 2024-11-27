const express = require('express');
const router = express.Router();
const {loginAuth} = require('../controllers/login_controller');
const { dataBirthdays, dataYearsOfService } = require('../controllers/dashboard_controller');
const { dataEmployees, dataSelectEmployees, dataAddEmployees, filterEmployees, searchEmployees, EmployeeController } = require('../controllers/employees_controller');
const { verifyToken } = require('../authentication/token_validation');
const { loggedInUser, loggedOutUser } = require('../controllers/drawer_controller');
const { loadDepartment } = require('../controllers/department_controller');
const { imageUpload, create } = require('../controllers/images_controller');


router.post("/login", loginAuth, loggedInUser);   
router.post("/birthday", verifyToken, dataBirthdays);
router.post("/anniversary", verifyToken, dataYearsOfService);
router.post("/loggedinUser", loggedInUser);
router.post("/logout", loggedOutUser);
router.get("/dashboard", verifyToken)

router.get("/profile", loggedInUser); // profile of employee


router.get("/departments", loadDepartment) // load departments

//Employee Controller Class
router.post("/employees/create", create);

router.post("/employees/add", new EmployeeController().add)
router.get("/employees/filter", new EmployeeController().filter)
router.get("/employees/search", new EmployeeController().search)
router.get("/employees/:emp_id", new EmployeeController().select); // select employee
router.get("/employees", new EmployeeController().index); //get all employees


router.post("/employees/image", imageUpload);




module.exports = router