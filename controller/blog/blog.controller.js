const determineSearchType = require("../../helpers/determineSearchType");
const {
  createBolgService,
  getBlogService,
  getSingleBlogService,
  deleteBlogServiceService,
  updateBlogService,
} = require("../../services/blog/blog.service");

// Create Blog
const createBlogController = async (req, res) => {
  try {
    const payload = req.body;

    const result = await createBolgService(payload);

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
    console.error(error.message);
    res.status(400).json({
      message: result.message,
      isSuccess: false,
    });
  }
};

// Get All Blogs
const getAllBlogsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const status = req?.query?.status;
    const deviceId = req?.query?.deviceId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};

    if (status) {
      filters.status = status;
    }
    if (deviceId) {
      filters.deviceId = deviceId;
    }

    const result = await getBlogService(
      limit,
      skip,
      searchText,
      filters,
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

// Get Single Blog
const getSingleBlogController = async (req, res) => {
  const identifier = req.params.id;
  const searchBy = determineSearchType(identifier);

  try {
    const result = await getSingleBlogService(identifier, searchBy);
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        data: result?.response,
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

// delete blog controller
const deleteBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteBlogServiceService(id);
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

// update or edit  blog controller
const updateBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await updateBlogService(id, updateData);
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
  createBlogController,
  getAllBlogsController,
  getSingleBlogController,
  deleteBlogController,
  updateBlogController,
};
