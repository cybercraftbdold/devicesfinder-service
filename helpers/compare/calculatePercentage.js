// Function to calculate percentage differences for comparison
function calculatePercentage(value1, value2) {
  let v1 = parseFloat(value1.replace(/[^0-9.]/g, "")); // Remove non-numeric characters for comparison
  let v2 = parseFloat(value2.replace(/[^0-9.]/g, "")); // Remove non-numeric characters for comparison
  let total = v1 + v2;
  if (total === 0) return [0, 0]; // Avoid division by zero

  let percentage1 = (v1 / total) * 100;
  let percentage2 = (v2 / total) * 100;

  return [percentage1.toFixed(2), percentage2.toFixed(2)];
}

module.exports = calculatePercentage;
