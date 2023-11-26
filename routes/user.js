const router = require('express').Router();
const userCont = require('../controllers/user');
const { isAuthenticated} = require("../middleware/authenticate");


router.get('/', isAuthenticated, userCont.getAllUsers);

router.get('/:id',isAuthenticated, userCont.getSingleUser);

router.post('/', isAuthenticated, userCont.addUser);

router.put('/:id',isAuthenticated, userCont.updateUser);

router.delete('/:id', isAuthenticated, userCont.deleteUser);

module.exports = router;