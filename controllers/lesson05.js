const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllVisits = async (req, res, next) => 
{
    const result = await mongodb
        .getDb()
        .db('project02')
        .collection('doc_visits')
        .find();
    result.toArray().then((lists) => 
    {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
const postNewVisit = async (req, res, next) =>
{
    const visit = 
    {
        date: req.body.date,
        doc_fname: req.body.doc_fname,
        doc_lname: req.body.doc_lname,
        email: req.body.email,
        prescription: req.body.prescription,
        refillable: req.body.refillable
    }
    const result = await mongodb
        .getDb()
        .db('project02')
        .collection('doc_visits')
        .insertOne(visit);
    if(result.acknowledged)
    {
        res.status(201).json(result)
    }
    else
    {
        res.status(500).json(result.error)
    }
}

module.exports =
{
    getAllVisits,
    postNewVisit
};
