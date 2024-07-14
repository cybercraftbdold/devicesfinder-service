const determineSearchType = require("../../helpers/determineSearchType");
const {
  createSpecificationService,
  getSpecificationService,
  getSingleSpecificationService,
  getTopPopularSpecificationsService,
  getSingleSpecificationByDeviceIdService,
  getUsedUniqueTypsService,
  getSpecificationByPropartyService,
} = require("../../services/specification/specification.service");

// create mobile specification
const createSpecificationController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createSpecificationService(payload);

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

//get mobile specification by porparty
const getSpecificationByPropartyController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchText = req?.query?.searchText;
  const status = req?.query?.status;
  const brand = req?.query?.brand;
  const deviceSubType = req?.query?.deviceSubType;
  const deviceType = req?.query?.deviceType;
  const deviceId = req?.query?.deviceId;
  const sortField = req?.query?.sortField || "createdAt";
  const sortOrder = req?.query?.sortOrder || "desc";
  const minPrice = req?.query?.minPrice || 0;
  const maxPrice = req?.query?.maxPrice || Infinity;

  // filters
  const filters = {};

  if (status) {
    filters.status = status;
  }
  if (brand) {
    filters.brand = brand;
  }
  if (deviceId) {
    filters.deviceId = deviceId;
  }
  if (deviceSubType) {
    filters.deviceSubType = deviceSubType;
  }
  if (deviceType) {
    filters.deviceType = deviceType;
  }

  // price range
  if (minPrice && maxPrice) {
    filters.priceRange = {
      min: minPrice,
      max: maxPrice,
    };
  }
  try {
    const result = await getSpecificationByPropartyService(
      limit,
      skip,
      searchText,
      filters,
      sortField,
      sortOrder
    );
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

//get all mobile specification
const getSpecificationController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchText = req?.query?.searchText;
    const status = req?.query?.status;
    const brand = req?.query?.brand;
    const deviceSubType = req?.query?.deviceSubType;
    const deviceType = req?.query?.deviceType;
    const deviceId = req?.query?.deviceId;
    const sortField = req?.query?.sortField || "createdAt";
    const sortOrder = req?.query?.sortOrder || "desc";
    const minPrice = req?.query?.minPrice || 0;
    const maxPrice = req?.query?.maxPrice || Infinity;

    // filters
    const filters = {};

    if (status) {
      filters.status = status;
    }
    if (brand) {
      filters.brand = brand;
    }
    if (deviceId) {
      filters.deviceId = deviceId;
    }
    if (deviceSubType) {
      filters.deviceSubType = deviceSubType;
    }
    if (deviceType) {
      filters.deviceType = deviceType;
    }

    // price range
    if (minPrice && maxPrice) {
      filters.priceRange = {
        min: minPrice,
        max: maxPrice,
      };
    }
    const result = await getSpecificationService(
      limit,
      skip,
      searchText,
      filters,
      sortField,
      sortOrder
    );

    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        totalItems: result?.response?.totalCount[0]?.value || 0,
        totalLength: result?.response.data?.length,
        data: result?.response.data,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      isSuccess: false,
    });
  }
};

// get single specification by canonical url or id or title
const getSingleSpecificationController = async (req, res) => {
  const identifier = req.params.identifier;
  const searchBy = determineSearchType(identifier);
  try {
    const result = await getSingleSpecificationService(identifier, searchBy);
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

const getSingleSpecificationByDeviceIdController = async (req, res) => {
  try {
    const deviceId = req.params.deviceId;

    const result = await getSingleSpecificationByDeviceIdService(deviceId);

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

//get top populer specification
const getTopPopularSpecificationsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const result = await getTopPopularSpecificationsService(limit, skip);
    // console.log(result)s
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        totalCount: result.totalCount,
        totalLength: result.totalLength,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
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
//get unique device types and subtypes
const getUsedUniqueTypsController = async (req, res) => {
  try {
    const result = await getUsedUniqueTypsService();
    if (result && result.isSuccess) {
      res.status(200).json({
        message: result?.message,
        isSuccess: result.isSuccess,
        data: result?.response,
      });
    } else {
      res.status(400).json({
        message: result?.message,
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

module.exports = {
  createSpecificationController,
  getSpecificationController,
  getSingleSpecificationController,
  getTopPopularSpecificationsController,
  getSingleSpecificationByDeviceIdController,
  getUsedUniqueTypsController,
  getSpecificationByPropartyController,
};
