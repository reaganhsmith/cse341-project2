const router = require('express').Router();
const userController = require('../controllers/users');
const validation = require('../middleware/validate')

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/', validation.saveContact, userController.createUser);

router.put('/:id', validation.saveContact, userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;