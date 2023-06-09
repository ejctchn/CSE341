const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const modify = async (req, res, next) =>
{
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    let today_date = `${month}/${day}/${year}`;

    const modified =
    {
        date: today_date,
        modified_field: "Modified Visit",
    };
    const mod = await mongodb
        .getDb()
        .db('project02')
        .collection('modifications')
        .insertOne(modified);

}

const getAllVisits = async (req, res, next) => 
{
    try
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
    }
    catch(error)
    {
        res.status(400).json({message:"Get all visits error, unexpected"})
    }
};

const getVisitById = async (req, res, next) => 
{
    if (!ObjectId.isValid(req.params.id)) 
    {
        ('Invlaid ID');
        
        const userId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db('project02')
            .collection('doc_visits')
            .find({_id: userId});
        result.toArray().then((lists) => 
        {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    }
};

const postNewVisit = async (req, res, next) =>
{
    try
    {
        if(!req.body.fname)
        {
            throw new Error('First name is required')
        }
        const visit = 
        {
            patient_fname: req.body.patient_fname,
            patient_lname: req.body.patient_lname,
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
            modify();
        }
        else
        {
            res.status(500).json(result.error)
        }
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
}

const updateVisit = async (req, res) =>
{
    try
    {
        if (!ObjectId.isValid(req.params.id)) 
        {
            throw new Error('Invalid ID');
        }

            const userId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const visit = {
            patient_fname: req.body.patient_fname,
            patient_lname: req.body.patient_lname,
            date: req.body.date,
            doc_fname: req.body.doc_fname,
            doc_lname: req.body.doc_lname,
            email: req.body.email,
            prescription: req.body.prescription,
            refillable: req.body.refillable
        };
        const response = await mongodb
            .getDb()
            .db('project02')
            .collection('doc_visits')
            .replaceOne({ _id: userId }, visit);
        console.log(response);
        if (response.modifiedCount > 0)
        {
            res.status(204).send();
            modify();
        } 
        else 
        {
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
        }
    }
    catch(error)
    {
        res.status(400).json({message:"Get all visits error, unexpected"});
    }
};

const deleteVisitById = async (req, res, next) =>
{
    try
    {
        if (!ObjectId.isValid(req.params.id)) 
        {
            throw new Error('Invalid ID');
        }
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
        .getDb()
        .db('project02')
        .collection('doc_visits')
        .deleteOne({ _id: userId }, true);
        console.log(response);
        if (response.deletedCount > 0) 
        {
            res.status(200).send();
            modify();
        } 
        else 
        {
            res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
        }
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
};


module.exports =
{
    getAllVisits,
    postNewVisit,
    updateVisit,
    deleteVisitById,
    getVisitById
};
