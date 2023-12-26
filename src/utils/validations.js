export const validateAmountEther = (value) => {
  // Remove non-numeric characters and leading zeros
  let onlyNumbers = value.replace(/[^0-9,.]/g, "").replace(/^0+(?=\d)/, "");

  // Replace commas with periods for decimal representation
  onlyNumbers = onlyNumbers.replace(/,/g, ".");

  // Add a leading zero if the value starts with a decimal point
  if (onlyNumbers.startsWith(".")) {
    onlyNumbers = "0" + onlyNumbers;
  }

  // Handle the case where there are multiple decimal points
  const dotCount = onlyNumbers.split(".").length - 1;
  if (dotCount > 1) {
    const firstDotIndex = onlyNumbers.indexOf(".");
    onlyNumbers =
      onlyNumbers.slice(0, firstDotIndex + 1) +
      onlyNumbers.slice(firstDotIndex + 1).replace(/\./g, "");
  }

  // Allow up to 18 leading zeros after comma
  const [integerPart, decimalPart] = onlyNumbers.split(".");
  if (decimalPart && decimalPart.length > 18) {
    onlyNumbers = `${integerPart}.${decimalPart.slice(0, 18)}`;
  }

  return onlyNumbers;
};
