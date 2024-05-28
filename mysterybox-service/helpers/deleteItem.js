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
