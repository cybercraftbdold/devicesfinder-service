const {
  createBrandService,
  getAllBrandService,
  updateBrandService,
  deleteBrandService,
  getSingleBrandService,
} = require("../../services/brand/brand.service");

// Create Brand
const createBrandController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createBrandService(payload);

    if (result.isSuccess) {
      res.status(201).json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result.message,
        isSuccess: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get All Brands
const getAllBrandsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";

    const result = await getAllBrandService(
      limit,
      skip,
      searchText,
      sortField,
      sortOrder
    );

    if (
      result &&
      result.isSuccess &&
      result.response &&
      result.response.length > 0
    ) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        totalItems: result?.response[0]?.totalCount[0]?.value || 0,
        totalLength: result?.response[0].data?.length,
        data: result?.response[0].data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// Get Single Brand
const getSingleBrandController = async (req, res) => {
  try {
    const params = req.params.id;

    const result = await getSingleBrandService(params);

    // Error response
    if (!result.isSuccess)
      return res.status(404).json({
        isSuccess: result?.isSuccess,
        message: result?.message,
      });

    // success response
    return res.status(200).json({
      message: result?.message,
      isSuccess: result.isSuccess,
      data: result?.data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// Update Brand
const updateBrandController = async (req, res) => {
  try {
    const updateId = req.params.id;
    const result = await updateBrandService(updateId, req.body);

    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(404).json({
        message: result?.message,
        isSuccess: false,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};

// Delete Brand
const deleteBrandController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBrandService(id);

    if (result?.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result?.isSuccess,
        response: result?.response,
      });
    } else {
      res.status(404).json({
        message: result?.message,
        isSuccess: false,
        response: result?.response,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
      isSuccess: false,
    });
  }
};

module.exports = {
  createBrandController,
  getAllBrandsController,
  updateBrandController,
  deleteBrandController,
  getSingleBrandController,
};
