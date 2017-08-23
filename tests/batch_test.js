const Sequelize = require('sequelize');
require('../');

const sequelize = new Sequelize('database', '', '', {
  host: 'localhost',
  dialect: 'sqlite',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  storage: './database.sqlite'
});

const Post = sequelize.define("Post", {
  title: Sequelize.STRING,
});

const test = async () => {
  await Post.sync({ force: true });

  const rows = Array.from(Array(10000).keys()).map(row => {
    return { title: `Post ${row}` };
  });
  
  await Post.bulkCreate(rows);

  for await (const posts of Post.batch({}, { size: 10 })) {
    for (const post of posts) {
      console.log(post.title);
    }
  }

  for await (const post of Post.iterator({})) {
    console.log(post.title);
  }
};

test();