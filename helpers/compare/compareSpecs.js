const calculatePercentage = require("./calculatePercentage");

function compareSpecs(value1, value2, attribute) {
  // Attempt to convert values to numbers to check if they are numeric
  let numValue1 = parseFloat(value1.replace(/[^0-9.]/g, ""));
  let numValue2 = parseFloat(value2.replace(/[^0-9.]/g, ""));

  // Check if both values are valid numbers
  if (!isNaN(numValue1) && !isNaN(numValue2)) {
    // Calculate percentage if both values are numbers
    const [percentage1, percentage2] = calculatePercentage(value1, value2);
    return {
      attribute: attribute,
      phone1: `${percentage1}%`,
      phone2: `${percentage2}%`,
    };
  } else {
    // Return direct comparison if values are not numbers
    return {
      attribute: attribute,
      comparison: `${value1} vs ${value2}`,
    };
  }
}

module.exports = compareSpecs;
