const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const withAuth = require('../../utils/auth-a');




// Routes	
router.get('/admin/', withAuth, userController.view);
router.post('/admin/', withAuth, userController.find);
router.get('/admin/adduser', withAuth, userController.form);
router.post('/admin/adduser', withAuth, userController.create);
router.get('/admin/edituser/:id', withAuth, userController.edit);
router.post('/admin/edituser/:id', withAuth, userController.update);
router.get('/admin/viewuser/:id', withAuth, userController.viewall);
router.get('/admin/:id', withAuth, userController.delete);




  
module.exports = router;