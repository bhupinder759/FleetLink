function calculateRideDuration(fromPin, toPin) {
  const duration = Math.abs(parseInt(toPin) - parseInt(fromPin)) % 24;
  return duration || 1; // ensure at least 1 hour
}

module.exports = calculateRideDuration;
