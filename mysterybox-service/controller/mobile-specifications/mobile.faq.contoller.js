const {
  createMobileFaqService,
  generateMobileFaqService,
  getMobileFaqService,
  deleteMobileFaqService,
} = require("../../services/mobile-specification/mobile.faq.service");

// create mobile faq controller
const createMobileFaqController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await createMobileFaqService(payload);
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
// generate content for mobile faq using open ai
const generateMobileFaqController = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await generateMobileFaqService(payload);
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
//get all mobile faq
const getMobileFaqController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const phoneId = req?.query?.phoneId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    const filters = {};
    // check type of filters
    if (phoneId) {
      filters.phoneId = phoneId;
    }
    // if (status) {
    //   filters.status = status;
    // }
    const result = await getMobileFaqService(
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

// delete mobile faq
const deleteMobileFaqController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteMobileFaqService(id);
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
  createMobileFaqController,
  generateMobileFaqController,
  getMobileFaqController,
  deleteMobileFaqController,
};
