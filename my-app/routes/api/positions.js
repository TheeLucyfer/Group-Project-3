const router = require("express").Router();
const positionsController = require("../../controllers/positionsController")

// matched with /api/positions/:email
router
    .route("/:email")
    .get(positionsController.findUserPos)
    .post(positionsController.create)

module.exports = router;