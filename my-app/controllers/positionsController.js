const db = require("../models");

module.exports = {

    findUserPos: function(req, res){
        db.Position
            .find({email: req.params.email})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))

    },

    create: function(req, res){
        db.Position
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
}   