const router = require("express").Router();
const positionRoutes = require("./positions");

// Book routes
router.use("/positions", positionRoutes);

module.exports = router;
