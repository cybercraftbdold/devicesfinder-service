const {
  addWebsiteService,
  getWebsitesService,
} = require("../../services/manage-mystery-box/manage.website.service");

// add website controller
const addWebsiteController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await addWebsiteService(payload);
    if (result.isSuccess) {
      res.json({
        message: result.message,
        isSuccess: result.isSuccess,
        data: result.response,
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

//get all website
const getWebsitesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const status = req?.query?.status;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};
    if (status) {
      filters.status = status;
    }
    const result = await getWebsitesService(
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

module.exports = {
  addWebsiteController,
  getWebsitesController,
};
