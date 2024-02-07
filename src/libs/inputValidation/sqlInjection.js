/**
 * Checks if a string is potentially dangerous for SQL injection.
 *
 * @param {string} str - The string to be checked.
 * @returns {boolean} `true` if the string is potentially dangerous, `false` otherwise.
 */
function isPotentiallyDangerousForSqlInjection(str) {
  // Check for empty string
  if (!str || typeof str !== "string") {
    return true; // Potentially dangerous
  }

  // Check for common SQL injection markers
  const dangerousPattern =
    /(--|;|'|\"|=|\b(and|or|union|select|insert|update|delete|drop)\b)/i;
  if (dangerousPattern.test(str)) {
    return true; // Potentially dangerous
  }

  // Additional checks for string-based attacks
  if (
    str.includes("--") || // Comment delimiter
    str.includes("/*") || // Multi-line comment start
    str.includes("*/") || // Multi-line comment end
    str.includes("\\'") || // Escaped single quote
    str.includes('\\"') || // Escaped double quote
    str.includes("\\") || // General escape character
    str.includes(";") // Semicolon
  ) {
    return true; // Potentially dangerous
  }

  // Check for unbalanced parentheses or backticks (possible code injection)
  const balanced = str.replace(/[^()\`]+/g, "");
  if (balanced !== "" && balanced !== "()" && balanced !== "``") {
    return true; // Potentially dangerous
  }

  // If no flags raised, assume string is likely safe
  return false;
}

module.exports = isPotentiallyDangerousForSqlInjection;
