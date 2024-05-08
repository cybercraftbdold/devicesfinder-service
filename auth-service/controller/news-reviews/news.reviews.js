const {
  createReivews,
  getAllReivews,
} = require("../../services/news-reviews/reviews.service");
const createReviewsController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createReivews(payload);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to post reivews", error: error.message });
  }
};
const getAllReviewsController = async (req, res) => {
  try {
    const result = await getAllReivews();
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to post reivews", error: error.message });
  }
};
module.exports = { createReviewsController, getAllReviewsController };
