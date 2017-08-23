const Sequelize = require('sequelize');


async function* batch(query = { }, options = { size: 1000 }) {
  const count = await this.count(options);

  if (count === 0) {
    return false;
  }

  const pages = Math.max(Math.round(count / options.size), 1);
  let page = 1;

  const params = Object.assign({}, query);
  while (page <= pages) {
    params.offset = (page - 1) * options.size;
    params.limit = options.size;

    yield await this.findAll(params);
    page = page + 1;
  }
}

async function* iterator(query = { }) {
  const rows = await this.findAll(query);
  for (const row of rows) {
    yield row;
  }
}

Sequelize.Model.batch = batch;
Sequelize.Model.iterator = iterator;
