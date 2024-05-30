/**
 * Updates a document in a MongoDB collection based on the provided ID.
 * @param {String} id - The ID of the document to be updated.
 * @param {mongoose.Model} Model - The Mongoose model representing the collection where the document exists.
 * @param {Object} data - The data to update in the document.
 * @returns {Object} An object containing the update result. If successful, returns the updated document and a success message. If no document is found or an error occurs, returns an error message.
 */
const updateItem = async (id, Model, data) => {
  try {
    const updatedDocument = await Model.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    if (updatedDocument) {
      return {
        isSuccess: true,
        response: updatedDocument,
        message: "Updated successfully",
      };
    } else {
      return {
        isSuccess: false,
        message: "No document found with the given ID",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: `Update failed: ${error.message}`,
    };
  }
};

module.exports = updateItem;
