const { ObjectId } = require("mongodb");
const BlogModel = require("../../models/blog-model/blog.model");
const {
  generateUniqueIdentifier,
} = require("../../helpers/generateUniqueCanonicalUrl");

const createBolgService = async (payload) => {
  let { title, deviceId, description, image, metaInformation } = payload;

  try {
    // Generate a unique canonical URL for the specification post
    const uniqueCanonicalUrl = await generateUniqueIdentifier(
      BlogModel,
      metaInformation.canonicalUrl,
      "metaInformation.canonicalUrl"
    );
    // Update metaInformation with the unique canonical URL
    metaInformation.canonicalUrl = uniqueCanonicalUrl;
    // Proceed to create a new BlogModel instance with the provided payload
    const blog = new BlogModel({
      title,
      deviceId,
      description,
      image,
      metaInformation,
    });

    // Attempt to save the new blog post to the database
    const newBlog = await blog.save();

    if (newBlog) {
      return {
        isSuccess: true,
        response: newBlog,
        message: "Device Blog created successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error?.message,
    };
  }
};

// Get All Blog
const getBlogService = async (
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
    // apply filters if they are provided
    if (filters) {
      if (filters.status) {
        query.status = filters.status;
      }
      if (filters.deviceId) {
        query.deviceId = filters.deviceId;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const res = await BlogModel.aggregate([
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
        response: res,
        message: "Data getting successfull",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

// Get Single Blog
const getSingleBlogService = async (identifier, searchBy) => {
  try {
    let pipeline = [];
    if (searchBy === "id") {
      pipeline.push({
        $match: { _id: new ObjectId(identifier) },
      });
    } else if (searchBy === "title") {
      pipeline.push({
        $match: { title: identifier },
      });
    } else if (searchBy === "canonicalUrl") {
      pipeline.push({
        $match: { "metaInformation.canonicalUrl": identifier },
      });
    } else {
      return {
        isSuccess: false,
        message: "Invalid search criteria provided.",
      };
    }

    pipeline.push({
      $limit: 1,
    });

    console.log(pipeline);

    const res = await BlogModel.aggregate(pipeline);
    console.log(res);
    if (res.length > 0) {
      const blog = res[0];
      // Increment viewCount
      await BlogModel.updateOne(
        { _id: new ObjectId(blog._id) },
        { $inc: { viewCount: 1 } }
      );

      // Return the updated document
      const updatedBlog = await BlogModel.findById(blog._id);
      return {
        isSuccess: true,
        response: updatedBlog,
        message: "Data fetching successful",
      };
    } else {
      return {
        isSuccess: false,
        message: "No document found matching the provided criteria.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = { createBolgService, getBlogService, getSingleBlogService };
