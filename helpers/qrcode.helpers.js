const qrcode = require("qrcode");

// Function to generate QR code image
const generateQRCodeImage = async (otpauthUrl) => {
  return new Promise((resolve, reject) => {
    qrcode.toDataURL(otpauthUrl, (err, imageUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(imageUrl);
      }
    });
  });
};

module.exports = generateQRCodeImage;
