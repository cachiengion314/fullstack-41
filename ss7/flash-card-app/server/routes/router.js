const express = require(`express`);
const router = express.Router();
const services = require(`../services/render`);
const controller = require(`../controller/controller`);

// routes => render page from views
router.get("/", services.homeRoutes);
router.get("/create", services.addCard);
router.get("/edit", services.editCard);

// API => controller database in cloud
router.post(`/api/create`, controller.create);
router.get(`/api/flash-card`, controller.find);
router.put(`/api/flash-card/:id`, controller.update);
// router.delete(`/api/users/:id`, controller.delete);

module.exports = router;