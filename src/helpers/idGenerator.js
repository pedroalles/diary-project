const crypto = require('crypto');

export const generateID = () => {
  return crypto.randomBytes(20).toString('hex');
};
