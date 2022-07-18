const mongoose = require('mongoose');

const addressModel = mongoose.model('Address');
const personModel = mongoose.model('Person');

module.exports = {
    getAllPersons: async (req, res, next) => {
        try {
            const persons = await personModel.find();

            res.status(200).json({
                count: persons.length,
                persons: persons.map(person => {
                    return {
                        id: person._id,
                        name: person.name,
                        lastName: person.lastName,
                        phone: person.phone,
                        email: person.email,
                        status: person.status,
                        createdAt: person.createdAt,
                        updatedAt: person.updatedAt
                    }
                })
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    getPersonById: async (req, res, next) => {
        try {
            const person = await personModel.findOne({ _id: req.params.personId });

            if (!person) {
                res.status(404).json('Person not found!');
                return;
            }

            res.status(200).json({
                id: person._id,
                name: person.name,
                lastName: person.lastName,
                phone: person.phone,
                email: person.email,
                status: person.status,
                createdAt: person.createdAt,
                updatedAt: person.updatedAt,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    postPerson: async (req, res, next) => {
        try {
            let person = new personModel({
                name: req.body.name,
                lastName: req.body.lastName,
                phone: req.body.phone,
                email: req.body.email,
                status: req.body.status
            })

            person = await person.save();

            res.status(200).json({
                message: 'Person saved successfully!',
                createdPerson: {
                    id: person._id,
                    name: person.name,
                    lastName: person.lastName,
                    phone: person.phone,
                    email: person.email,
                    status: person.status
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    patchPersonById: async (req, res, next) => {
        try {
            const id = req.params.personId;
            const updateFields = {};

            Object.entries(req.body).map(item => {
                updateFields[item[0]] = item[1];
            });

            const status = await personModel.updateOne(
                { _id: id },
                { $set: updateFields }
            );

            res.status(200).json({
                message: 'Person updated successfully!',
                status: status,
                updateFields: updateFields
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    deletePersonById: async (req, res, next) => {
        try {
            const id = req.params.personId;
            const person = await personModel.findOne({ _id: id });

            if (!person) {
                res.status(404).json('Person not found!');
                return;
            }

            const status = await personModel.deleteOne({ _id: id });
            const statusAddresses = await addressModel.deleteMany({ person: id });

            res.status(200).json({
                message: 'Person deleted successfully!',
                status: status,
                addresses: {
                    message: 'Person-related addresses deleted successfully!',
                    status: statusAddresses
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
