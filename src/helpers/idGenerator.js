const crypto = require('crypto');

export const generateID = () => crypto.randomBytes(20).toString('hex');
