// single items serch type
const determineSearchType = (identifier) => {
  if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
    return "id"; // Assuming it's an ID if it's a valid ObjectId
  } else if (/^[a-zA-Z0-9.-]+$/.test(identifier)) {
    return "canonicalUrl";
  } else {
    return "title";
  }
};

module.exports = determineSearchType;
