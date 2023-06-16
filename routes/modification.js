const routes = require('express').Router();
const controller = require("../controllers/lesson05")
const ensure_auth = (req, res, next) => 
{
    try
    {
        if(req.session.token)
        {
            next();
        }
        else
        {
            throw new Error("Please log in.")
        }
    }
    catch(error)
    {
        res.status(500).json({message:error.message});    
    }
}

routes.get('/', controller.getAllVisits);

routes.post('/', ensure_auth, controller.postNewVisit);

routes.put('/:id', ensure_auth, controller.updateVisit);

//routes.put('/:id', controller.updateContact);

routes.delete('/:id', ensure_auth, controller.deleteVisitById);