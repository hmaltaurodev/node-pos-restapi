const mongoose = require('mongoose');

const addressModel = mongoose.model('Address');
const personModel = mongoose.model('Person');

module.exports = {
    getAllAddresses: async (req, res, next) => {
        try {
            const addresses = await addressModel.find().populate('person', 'name lastName status');

            res.status(200).json({
                count: addresses.length,
                addresses: addresses.map(address => {
                    return {
                        id: address._id,
                        person: address.person,
                        cep: address.cep,
                        place: address.place,
                        number: address.number,
                        complement: address.complement,
                        district: address.district,
                        city: address.city,
                        uf: address.uf,
                        createdAt: address.createdAt,
                        updatedAt: address.updatedAt
                    }
                })
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getAddressById: async (req, res, next) => {
        try {
            const address = await addressModel.findOne({ _id: req.params.addressId }).populate('person', 'name lastName status');

            if (!address) {
                res.status(404).json('Address not found!');
                return;
            }

            res.status(200).json({
                id: address._id,
                person: address.person,
                cep: address.cep,
                place: address.place,
                number: address.number,
                complement: address.complement,
                district: address.district,
                city: address.city,
                uf: address.uf,
                createdAt: address.createdAt,
                updatedAt: address.updatedAt
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getAddressesByPersonId: async (req, res, next) => {
        try {
            const person = await personModel.findOne({ _id: req.params.personId }).select('name lastName status');

            if (!person) {
                res.status(404).json('Person not found!');
                return;
            }

            const addresses = await addressModel.find({ person: person._id });

            res.status(200).json({
                count: addresses.length,
                person: {
                    id: person._id,
                    name: person.name,
                    lastName: person.lastName
                },
                addresses: addresses.map(address => {
                    return {
                        id: address._id,
                        cep: address.cep,
                        place: address.place,
                        number: address.number,
                        complement: address.complement,
                        district: address.district,
                        city: address.city,
                        uf: address.uf,
                        createdAt: address.createdAt,
                        updatedAt: address.updatedAt
                    }
                })
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    postAddress: async (req, res, next) => {
        try {
            const person = await personModel.findOne({ _id: req.body.person });
            if (!person) {
                res.status(404).json('Person not found!');
                return;
            }

            let address = new addressModel({
                person: req.body.person,
                cep: req.body.cep,
                place: req.body.place,
                number: req.body.number,
                complement: req.body.complement,
                district: req.body.district,
                city: req.body.city,
                uf: req.body.uf
            });

            address = await address.save();

            res.status(201).json({
                message: 'Address successfully saved!',
                createdAddress: {
                    id: address._id,
                    person: address.person,
                    cep: address.cep,
                    place: address.place,
                    number: address.number,
                    complement: address.complement,
                    district: address.district,
                    city: address.city,
                    uf: address.uf
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    patchAddressById: async (req, res, next) => {
        try {
            const id = req.params.addressId;
            const updateFields = {};

            Object.entries(req.body).map(item => {
                updateFields[item[0]] = item[1];
            });

            const status = await addressModel.updateOne(
                { _id: id },
                { $set: updateFields }
            );

            res.status(200).json({
                message: 'Address successfully updated!',
                status: status,
                updateFields: updateFields
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deleteAddressById: async (req, res, next) => {
        try {
            const id = req.params.addressId;
            const address = await addressModel.findOne({ _id: id });

            if (!address) {
                res.status(404).json('Address not found!');
                return;
            }

            const status = await addressModel.deleteOne({ _id: id });

            res.status(200).json({
                message: 'Address successfully deleted!',
                status: status
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
