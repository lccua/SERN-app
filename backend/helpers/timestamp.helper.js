
const OtpExpiryGenerator = () => {
  const expiresTimestamp = new Date();
  expiresTimestamp.setMinutes(expiresTimestamp.getMinutes() + 15);
  return expiresTimestamp;
}

const TimestampGenerator = () => {
  const timestamp = new Date();
  return timestamp;
}

module.exports = { OtpExpiryGenerator, TimestampGenerator  };
