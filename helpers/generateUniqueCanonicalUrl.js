/**
 * Generates a unique identifier (e.g., URL) for a given field in a MongoDB model.
 * @param model The Mongoose model to check for uniqueness within.
 * @param baseValue The base value to start with (e.g., a URL or username).
 * @param fieldName The name of the field within the model to check for uniqueness (e.g., "metaInformation.canonicalUrl").
 * @returns A promise that resolves to a unique value for the field.
 */
const generateUniqueIdentifier = async (model, baseValue, fieldName) => {
  let uniqueValue = baseValue;
  let suffix = 0; // Start with no suffix

  // Build a dynamic query based on the fieldName
  const query = {};
  query[fieldName] = new RegExp(`^${baseValue}(-\\d+)?$`);

  const existingEntries = await model.find(query, fieldName);

  if (existingEntries.length > 0) {
    const suffixes = existingEntries.map((entry) => {
      const fieldValue = entry.get(fieldName); // Dynamically get the field value
      const match = fieldValue.match(/-(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
    const maxSuffix = Math.max(...suffixes);
    suffix = maxSuffix + 1;
    uniqueValue = `${baseValue}-${suffix}`;
  }

  return uniqueValue;
};

module.exports = { generateUniqueIdentifier };
