const androidController = async (req, res) => {
  try {
    const payload = req.body;
    const content = { content: "hi aim content" };
    res.json({ content });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate content", error: error.message });
  }
};
module.exports = androidController;
