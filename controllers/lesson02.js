const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res, next) => 
{
    const result = await mongodb
        .getDb()
        .db('DBname')
        .collection('Contacts')
        .find();
    result.toArray().then((lists) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getContactById = async (req, res, next) => 
{
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('DBname')
        .collection('Contacts')
        .find({_id: userId});
    result.toArray().then((lists) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const postNewContact = async (req, res, next) =>
{
    const result = await mongodb
        .getDb()
        .db('DBname')
        .collection('Contacts')
        .post();
    result.toArray().then((lists) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(lists[0]);
    });
}

//const deleteContactById = async (req, res, next) =>


module.exports =
{
    getAllContacts,
    getContactById,
    postNewContact
};
