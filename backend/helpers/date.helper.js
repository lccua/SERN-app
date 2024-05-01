const getCurrentDateFormatted = () => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

module.exports = { getCurrentDateFormatted };
