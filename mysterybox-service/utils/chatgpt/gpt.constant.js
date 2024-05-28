const isHtmlFormatConstant = `Remember This Notes: Format the response using HTML tags for headings, paragraphs, and lists. Also, include inline styles for different HTML elements like <h1> for the main title, <h2> for subheadings, <p> for paragraphs, and <ul> and <li> for bullet points. Use bold text where appropriate.`;

const jsonFormateConstant = `Please ensure all responses are in JSON format.`;
const metaInformationConstant = `Please ensure all responses are in JSON format. The response JSON should include essential SEO metadata such as canonical URL, main keyword, meta description, meta title, and a list of seed keywords. Follow the structure provided below: { "metaInformation": {
        "canonicalUrl": "",
        "mainKeyword": "",
        "metaDescription": "",
        "metaTitle": "",
        "seedKeyword": ["", "", ""]
      }
    } 
}`;
module.exports = {
  isHtmlFormatConstant,
  metaInformationConstant,
  jsonFormateConstant,
};
