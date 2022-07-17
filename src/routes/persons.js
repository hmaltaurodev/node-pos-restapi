const express = require('express');

const router = express.Router();
const controllerPerson = require('../controllers/person-controller');

router.get('/', controllerPerson.getAllPersons);
router.get('/:personId', controllerPerson.getPersonById);

router.post('/', controllerPerson.postPerson);

router.patch('/:personId', controllerPerson.patchPersonById);

router.delete('/:personId', controllerPerson.deletePersonById);

module.exports = router;
