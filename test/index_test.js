const Sequelize = require('sequelize');
require('../src/');

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
  userId: Sequelize.INTEGER,
});

const test = async () => {
  await Post.sync({ force: true });

  users = [1, 2, 3];
  const getUserId = () => users[Math.floor(Math.random()*users.length)];

  const rows = Array.from(Array(1000).keys()).map(row => {
    const userId = getUserId();
    return { userId, title: `Post ${row}` };
  });
  
  await Post.bulkCreate(rows);

  for await (const posts of Post.batch({}, { size: 10 })) {
    for (const post of posts) {
      console.log(post.title);
    }
  }

  for await (const posts of Post.batch({ where: { userId: 1 } }, { size: 10 })) {
    for (const post of posts) {
      console.log(`${post.userId}: ${post.title}`);
    }
  }

  for await (const post of Post.iterator()) {
    console.log(post.title);
  }

  for await (const post of Post.iterator({
    where: {
      id: {
        $gte: 900,
      }
    }
  })) {
    console.log(post.title);
  }
};

test();