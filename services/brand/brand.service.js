const BrandModel = require("../../models/brand-model/brand-model");
const deleteItem = require("../../helpers/service-helpers/deleteItem");

// Create Brand
const createBrandService = async (payload) => {
  let { title, description, image, metaInformation } = payload;

  try {
    const duplicateBrand = await BrandModel.findOne({ title });

    // Checking for duplicate brand
    if (duplicateBrand)
      return {
        isSuccess: false,
        message: "Already have a brand with the same name.",
      };

    // Proceed to create a new BrandModel instance with the provided payload
    const brand = new BrandModel({
      title,
      image,
      description,
      metaInformation,
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

// Update Brand Service
const updateBrandService = async (id, payload) => {
  try {
    const updatedBrand = await BrandModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );

    if (!updatedBrand) {
      return {
        isSuccess: false,
        message: "Brand update failed!",
      };
    }

    return {
      isSuccess: true,
      response: updatedBrand,
      message: "Brand Updated Successfully",
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// Delete Brand Service
const deleteBrandService = async (id) => {
  return await deleteItem(id, BrandModel);
};

module.exports = {
  createBrandService,
  getAllBrandService,
  updateBrandService,
  deleteBrandService,
};
