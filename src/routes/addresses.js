const express = require('express');

const router = express.Router();
const controllerAddress = require('../controllers/address-controller');

router.get('/', controllerAddress.getAllAddresses);
router.get('/:addressId', controllerAddress.getAddressById);
router.get('/person/:personId', controllerAddress.getAddressesByPersonId);

router.post('/', controllerAddress.postAddress);

router.patch('/:addressId', controllerAddress.patchAddressById);

router.delete('/:addressId', controllerAddress.deleteAddressById);

module.exports = router;
