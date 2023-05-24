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
    const contact = 
    {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    }
    const result = await mongodb
        .getDb()
        .db('DBname')
        .collection('Contacts')
        .insertOne(contact);
    if(result.acknowledged)
    {
        res.status(201).json(result)
    }
    else
    {
        res.status(500).json(result.error)
    }
}

const deleteContactById = async (req, res, next) =>
{
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('DBname').collection('Contacts').deleteOne({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

const updateContact = async (req, res) =>
{
    const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db('DBname')
    .collection('Contacts')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

module.exports =
{
    getAllContacts,
    getContactById,
    postNewContact,
    updateContact,
    deleteContactById
};
