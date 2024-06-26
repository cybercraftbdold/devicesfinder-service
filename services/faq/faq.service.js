const updateWithDeviceIdService = require("../../helpers/service-helpers/updateWithDeviceId");
const FaqModel = require("../../models/faq-model/faq.model");

// Create Faq
const createFaqService = async (payload) => {
  let { title, deviceId, reviewStatus, faqList, metaInformation } = payload;

  try {
    const duplicateFaq = await FaqModel.findOne({ deviceId });

    // updating faq if faq already exists
    if (duplicateFaq)
      return await updateWithDeviceIdService(payload, FaqModel, "Faq");

    // Proceed to create a new DeviceReviewModel instance with the provided payload
    const faq = new FaqModel({
      title,
      deviceId,
      reviewStatus,
      faqList,
      metaInformation,
    });

    // Attempt to save the new faq to the database
    const newFaq = await faq.save();

    if (newFaq) {
      return {
        isSuccess: true,
        response: newFaq,
        message: "Device Faq published successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All FAQ
const getAllFaqService = async (
  limit,
  skip,
  searchText,
  filters,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};

    if (searchText) {
      query.$or = [{ title: { $regex: searchText, $options: "i" } }];
    }

    // Apply filters if they are provided
    if (filters) {
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await FaqModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "value" }],
        },
      },
    ]);
    if (res) {
      return {
        isSuccess: true,
        response: res[0],
        message: "Data getting successful",
      };
    } else {
      return {
        isSuccess: true,
        response: [],
        message: "No data found",
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
  createFaqService,
  getAllFaqService,
};
