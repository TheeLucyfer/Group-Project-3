const router = require("express").Router();
const positionsController = require("../../controllers/positionsController")

router
    .route("/:email")
    .get(positionsController.findUserPos)
    .post(positionsController.create)