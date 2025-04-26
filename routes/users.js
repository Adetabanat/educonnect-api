const router = require("express").Router();

const validation = require("../middleware/validate");
const userController = require("../controllers/users");
const { isAuthenticated } = require("../middleware/authenticate"); // ✅ import it correctly

// Routes
router.get("/", userController.getAll);

router.get("/:id", userController.getSingle);

router.post("/", isAuthenticated, validation.saveUser, userController.createUser);

router.put("/:id", isAuthenticated, validation.saveUser, userController.updateUser);

router.delete("/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
