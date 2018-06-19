const Sequelize = require("sequelize");

async function* batch(query = { batchSize: 1000 }) {
  const count = await this.count(query);

  if (count === 0) {
    return false;
  }
  const pagesRemainder = (count % query.batchSize) ? 1 : 0;
  const pages = Math.floor(count / query.batchSize) + pagesRemainder;
  let page = 1;

  const params = Object.assign({}, query);
  while (page <= pages) {
    params.offset = (page - 1) * query.batchSize;
    params.limit = query.batchSize;

    yield await this.findAll(params);
    page = page + 1;
  }
}

async function* iterator(query = {}) {
  const rows = await this.findAll(query);
  for (const row of rows) {
    yield row;
  }
}

Sequelize.Model.batch = batch;
Sequelize.Model.iterator = iterator;
