const updateWithDeviceIdService = async (payload, model, serviceName) => {
  try {
    const updatedData = await model.findOneAndUpdate(
      { deviceId: payload.deviceId },
      { $set: payload },
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
