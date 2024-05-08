const getCurrentDateFormatted = () => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour12: false, 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return new Date().toLocaleDateString('en-US', options);
};

module.exports = { getCurrentDateFormatted };
