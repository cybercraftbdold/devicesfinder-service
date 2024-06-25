const updateWithDeviceIdService = async (payload, model, serviceName) => {
  try {
    const { deviceId, ...updatePayload } = payload;

    const updatedData = await model.findOneAndUpdate(
      { deviceId },
      { $set: updatePayload },
      { new: true }
    );

    if (!updatedData) {
      return {
        isSuccess: false,
        message: `${serviceName} update failed!`,
      };
    }

    return {
      isSuccess: true,
      response: updatedData,
      message: `${serviceName} Updated Successfully`,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: `Update failed: ${error.message}`,
    };
  }
};

module.exports = updateWithDeviceIdService;
