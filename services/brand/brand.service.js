const BrandModel = require("../../models/brand-model/brand-model");

// Create Brand
const createBrandService = async (payload) => {
  let { title, image } = payload;

  try {
    // Proceed to create a new BrandModel instance with the provided payload
    const brand = new BrandModel({
      title,
      image,
    });
    // Attempt to save the new blog post to the database
    const newBrand = await brand.save();

    if (newBrand) {
      return {
        isSuccess: true,
        response: newBrand,
        message: "Brand create successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All Brands
const getAllBrandService = async (
  limit,
  skip,
  searchText,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};
    if (searchText) {
      query.$or = [{ title: { $regex: searchText, $options: "i" } }];
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    // Getting brands from database
    const brands = await BrandModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "value" }],
        },
      },
    ]);

    if (brands) {
      return {
        isSuccess: true,
        response: brands,
        message: "Data getting successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = { createBrandService, getAllBrandService };
