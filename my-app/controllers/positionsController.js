const db = require("../models");

module.exports = {

    findUserPos: function(req, res){
        db.Position
            .find({email: req.params.email})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    },

    createPos: function(req, res){
        db.Position
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    deletePos: function(req, res){
        db.Position
            .find({email: req.params.email, ticker:req.body.ticker})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    },

    updatePos: function(req, res){
        db.Position
            .findOneAndUpdate({email: req.params.email, ticker:req.body.ticker}, req.body)
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    },

}       