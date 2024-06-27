/**
 * Updates a document in a MongoDB collection based on the provided ID.
 * @param {String} id - The ID of the document to be updated.
 * @param {Object} updateData - The data to update the document with.
 * @param {mongoose.Model} Model - The Mongoose model representing the collection in which the document will be updated.
 * @returns {Object} An object containing the update result. If successful, returns the updated document and a success message. If no document is found with the given ID, or if an error occurs, returns an error message.
 */
const updateItem = async (id, Model, updateData) => {
  try {
    const res = await Model.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Update Successfully Completed",
      };
    } else {
      return { isSuccess: false, message: "Data Not Found" };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
  }
};

module.exports = updateItem;
