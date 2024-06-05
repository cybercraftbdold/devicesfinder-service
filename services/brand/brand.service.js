const BrandModel = require("../../models/brand-model/brand-model");

// create brand
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

// get brands
const getBrandService = async () => {};

module.exports = { createBrandService, getBrandService };
