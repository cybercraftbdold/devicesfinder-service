const {
  createReivews,
} = require("../../services/news-reviews/reviews.service");

const createReviewsController = async (req, res) => {
  try {
    const payload = req.body;
    const result = await createReivews(payload);
    res.json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate content", error: error.message });
  }
};
module.exports = { createReviewsController };
