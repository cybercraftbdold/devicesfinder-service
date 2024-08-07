const { Router } = require("express");
const {
  createProsController,
  getAllProsController,
  deleteProsController,
} = require("../../controller/pros/pros.controller");
const { baseRoute } = require("../../utils/constant");
const requestValidator = require("../../middleware/request-validator");
const prosSchemaValidator = require("../../validators/pros.validator");

const prosRouter = Router();

// create pros route
prosRouter.post(
  `${baseRoute}/create-pros`,
  requestValidator(prosSchemaValidator),
  createProsController
);

// get all pros route
prosRouter.get(`${baseRoute}/get-pros`, getAllProsController);
// delete pros route
prosRouter.delete(`${baseRoute}/delete-pros/:id`, deleteProsController);

module.exports = prosRouter;
