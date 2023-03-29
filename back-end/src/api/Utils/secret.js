const { readFileSync } = require('fs');

const secret = readFileSync(`${__dirname}/../../../jwt.evaluation.key`, { encoding: 'utf-8' });

module.exports = secret;
