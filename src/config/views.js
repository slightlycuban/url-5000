const handlebars = require('handlebars');

const views = {
  engines: {
    html: handlebars
  },
  relativeTo: `${__dirname}/../`,
  path: './templates',
  layout: true,
  layoutPath: './templates/layouts'
};

module.exports = views;
