/**
 * Image and formatting utilities for Infostore Frontend
 * Handles image URL construction and price formatting
 */

// Get API base URL without /api/v2 suffix for media files
const getApiBase = () => {
  const apiUrl =
    process.env.REACT_APP_API_URL || "http://localhost:8000/api/v2";
  return apiUrl.replace("/api/v2", "");
};

/**
 * Convert relative image path to absolute URL
 * @param {string} imagePath - Image path from API (e.g., /media/product_img/iphone.jpg)
 * @returns {string} - Full image URL
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder-product.png";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Ensure path starts with /
  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${getApiBase()}${path}`;
};

/**
 * Format price to Angolan currency format
 * @param {string|number} price - Price value
 * @returns {string} - Formatted price (e.g., "250.000,00")
 */
export const formatPrice = (price) => {
  if (!price) return "0,00";

  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice)) return "0,00";

  return new Intl.NumberFormat("pt-AO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numPrice);
};

/**
 * Calculate original price from discounted price
 * @param {string|number} price - Current price
 * @param {number} discount - Discount percentage (0-100)
 * @returns {number} - Original price before discount
 */
export const calculateOriginalPrice = (price, discount) => {
  if (!discount || discount <= 0) return price;

  const numPrice = typeof price === "string" ? parseFloat(price) : price;

  if (isNaN(numPrice)) return 0;

  return Math.round(numPrice / (1 - discount / 100));
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};
