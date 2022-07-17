const mongoose = require('mongoose');

const personModel = mongoose.model('Person');

module.exports = {
    getAllPersons: async (req, res, next) => {
        try {
            const persons = await personModel.find().select('name lastName status');

            res.status(200).json({
                count: persons.length,
                persons: persons.map(person => {
                    return {
                        id: person._id,
                        name: person.name,
                        lastName: person.lastName,
                        status: person.status,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/persons/' + person._id
                        }
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
            const id = req.params.personId;
            const person = await personModel.findOne({ _id: id });

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
                    status: person.status,
                    createdAt: person.createdAt,
                    updatedAt: person.updatedAt,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/persons/' + person._id
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    patchPersonById: async (req, res, next) => {
        const id = req.params.personId;
        const updateFields = {};

        Object.entries(req.body).map(item => {
            updateFields[item[0]] = item[1];
        });

        try {
            const status = await personModel.updateOne(
                { _id: id },
                { $set: updateFields }
            );

            res.status(200).json({
                message: 'Person updated successfully!',
                status: status,
                updateFields: updateFields,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/persons/' + id
                }
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
            const status = await personModel.deleteOne({ _id: id });

            res.status(200).json({
                message: 'Person deleted successfully!'
            })
        }
        catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}
