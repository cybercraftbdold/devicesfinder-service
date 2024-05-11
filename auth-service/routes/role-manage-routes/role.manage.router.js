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
roleRouter.post(`/auth/role/create-role`, createRoleController);
roleRouter.get(`/auth/role/get-all-role`, getAllRoleController);
roleRouter.get(`/auth/role/get-single-role/:roleName`, getSingRoleController);
roleRouter.delete(`/auth/role/delete-role`, deleteRoleController);
roleRouter.delete(`/auth/role/delete-role-menu/:id`, deleteRoleMenuController);
roleRouter.put(`/auth/role/update-role/:id`, updateRoleController);

module.exports = roleRouter;
