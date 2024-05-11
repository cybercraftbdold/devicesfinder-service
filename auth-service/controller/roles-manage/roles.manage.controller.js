const {
  createRoleService,
  getAllroleService,
  getSingleRoleService,
  deleteRoleService,
  deleteRoleMenuService,
  updateRoleService,
} = require("../../services/roles-manage/roles.manage.service");

//----------------role post controller--------------------
const createRoleController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createRoleService(payload);
    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        response: result.response,
        isSuccess: result.isSuccess,
      });
    } else {
      res.status(400).json({
        message: result?.message,
        response: result.response,
        isSuccess: result.isSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};
//----------------get all role controller--------------------
const getAllRoleController = async (req, res) => {
  try {
    const result = await getAllroleService();
    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        roles: result?.response,
      });
    } else {
      res.status(404).json({
        message: "No data found",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};
//----------------get singel role controller--------------------
const getSingRoleController = async (req, res) => {
  try {
    const roleName = req.params.roleName;
    const result = await getSingleRoleService(roleName);
    if (result.isSuccess) {
      res.status(200).json({
        message: result.message,
        isSuccess: result.isSuccess,
        response: result.response,
      });
    } else {
      res.status(404).json({
        message: result.message,
        isSuccess: result.isSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};
//---------------- delete role controller --------------------
const deleteRoleController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteRoleService(id);
    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};
//---------------- delete role menu controller --------------------
const deleteRoleMenuController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteRoleMenuService(id);
    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};
//---------------- edit/update role controller--------------------
const updateRoleController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateRoleService(id, data);
    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createRoleController,
  getAllRoleController,
  getSingRoleController,
  deleteRoleController,
  updateRoleController,
  deleteRoleMenuController,
};
