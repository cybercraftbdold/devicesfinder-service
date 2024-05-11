const mongoose = require("mongoose");
const RoleModel = require("../../models/roles-manage-model/role.model");
//----------------  role post service--------------------
const createRoleService = async (payload) => {
  let { menus, roleName } = payload;
  roleName = roleName.toLowerCase();
  try {
    // Check if role with the same name already exists
    const existingRole = await RoleModel.findOne({ roleName });
    if (existingRole) {
      return {
        isSuccess: false,
        message: "Role with the same name already exists",
      };
    }

    const roleModel = new RoleModel({
      menus,
      roleName,
    });

    const res = await roleModel.save();
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Role successfully created",
      };
    } else {
      return {
        isSuccess: false,
        response: res,
        message: "Something wrong, please try again",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};
//---------------- find all role servoce--------------------
const getAllroleService = async () => {
  try {
    const res = await RoleModel.find({});
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Role getting successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

//---------------- get single role--------------------
const getSingleRoleService = async (roleName) => {
  try {
    // let pipeline[] = [{ $match: { _id: new ObjectId(id) } }];
    let pipeline = [{ $match: { roleName: roleName } }];
    pipeline.push({
      $limit: 1,
    });

    const res = await RoleModel.aggregate(pipeline);

    if (res.length > 0) {
      return {
        isSuccess: true,
        response: res[0],
        message: "Data fetching successful",
      };
    } else {
      return {
        isSuccess: false,
        message: "No document found matching the provided criteria.",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

//---------------- delete role service--------------------
const deleteRoleService = async (id) => {
  try {
    // First, check if the document with the given id exists
    const existingRole = await RoleModel.findOne({ _id: id });
    if (!existingRole) {
      return {
        isSuccess: false,
        message: "Role not found.",
        res: existingRole,
      };
    }

    const res = await RoleModel.findByIdAndDelete({ _id: id });
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Role delete successfull",
      };
    } else {
      return {
        isSuccess: false,
        message:
          "No document was delete. Possibly, the provided ID does not exist.",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

const deleteRoleMenuService = async (menuId) => {
  try {
    const deletedMenu = await RoleModel.aggregate([
      // Match the role containing the menu to delete
      { $match: { "menus._id": new mongoose.Types.ObjectId(menuId) } },
      // Project to exclude the menu to delete from the menus array
      {
        $project: {
          roleName: 1,
          menus: {
            $filter: {
              input: "$menus",
              as: "menu",
              cond: {
                $ne: ["$$menu._id", new mongoose.Types.ObjectId(menuId)],
              },
            },
          },
        },
      },
    ]);

    // Check if the role containing the menu was found
    if (deletedMenu.length === 0) {
      return {
        isSuccess: false,
        message: "Role containing the menu not found.",
      };
    }

    // Update the role with the modified menus array
    const updatedRole = await RoleModel.findByIdAndUpdate(
      deletedMenu[0]._id,
      { $set: { menus: deletedMenu[0].menus } },
      { new: true }
    );

    return {
      isSuccess: true,
      message: "Role Menu deleted successfully",
      response: updatedRole,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

//---------------- edit/update role service--------------------
const updateRoleService = async (id, data) => {
  try {
    // First, check if the document with the given id exists
    const existingRole = await RoleModel.findById({ _id: id });
    if (!existingRole) {
      return {
        isSuccess: false,
        message: "Role not found.",
      };
    }

    const res = await RoleModel.findByIdAndUpdate({ _id: id }, { $set: data });
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Role update successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = {
  createRoleService,
  getAllroleService,
  getSingleRoleService,
  deleteRoleService,
  deleteRoleMenuService,
  updateRoleService,
};
