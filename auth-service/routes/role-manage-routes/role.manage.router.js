const { Router } = require("express");
const {
  createRoleController,
  getAllRoleController,
  getSingRoleController,
  deleteRoleController,
  deleteRoleMenuController,
  updateRoleController,
} = require("../../controller/roles-manage/roles.manage.controller");
const roleRouter = Router();
roleRouter.post(`/role/create-role`, createRoleController);
roleRouter.get(`/role/get-all-role`, getAllRoleController);
roleRouter.get(`/role/get-single-role/:roleName`, getSingRoleController);
roleRouter.delete(`/role/delete-role`, deleteRoleController);
roleRouter.delete(`/role/delete-role-menu/:id`, deleteRoleMenuController);
roleRouter.put(`/role/update-role/:id`, updateRoleController);

module.exports = roleRouter;
