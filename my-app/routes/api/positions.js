const router = require("express").Router();
const positionsController = require("../../controllers/positionsController")

// matched with /api/positions/:email
router
    .route("/:email")
    .get(positionsController.findUserPos)
    .post(positionsController.createPos)
    .put(positionsController.updatePos)
    .delete(positionsController.remove)

module.exports = router;