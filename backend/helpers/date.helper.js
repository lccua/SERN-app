const getCurrentDateFormatted = () => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return new Date().toLocaleDateString('en-US', options);
};

module.exports = { getCurrentDateFormatted };
