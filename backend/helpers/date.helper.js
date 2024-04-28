const dateFormater = () => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

module.exports = { dateFormater };
