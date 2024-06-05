const {
  createBrandService,
  getBrandService,
} = require("../../services/brand/brand.service");

// Create Brand
const createBrandController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createBrandService(payload);

    if (result.isSuccess) {
      res.json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.json({
        message: result.message,
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get All Brands
const getAllBrandsController = async (req, res) => {};

module.exports = { createBrandController, getAllBrandsController };
