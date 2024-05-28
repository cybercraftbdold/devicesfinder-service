/**
 * Deletes a document from a MongoDB collection based on the provided ID.
 * @param {String} id - The ID of the document to be deleted.
 * @param {mongoose.Model} Model - The Mongoose model representing the collection from which the document will be deleted.
 * @returns {Object} An object containing the deletion result. If successful, returns the deleted document and a success message. If no document is found with the given ID, or if an error occurs, returns an error message.
 */
const deleteItem = async (id, Model) => {
  try {
    const res = await Model.findByIdAndDelete({
      _id: id,
    });
    if (res) {
      return {
        isSuccess: true,
        response: res,
        message: "Delete Sucessfully Completed",
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

module.exports = deleteItem;
