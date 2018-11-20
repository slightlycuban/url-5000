const Joi = require('joi');
const links = require('../handlers/link');

const urlSchema = {
  url: Joi.string().uri({ scheme: ['http', 'https'] }).trim().required()
};

module.exports = [{
  path: '/link',
  method: 'POST',
  handler: links.create,
  options: {
    validate: {
      payload: urlSchema
    }
  }
}, {
  path: '/{hash}',
  method: 'GET',
  handler: links.get
}];
