# Sequelize Batches/Iterators

*Note: depends on async generators*

works with Node 8.4.0 ```node --harmony-async-iteration```

## Install

```bash
yarn add sequelize-batches
```

Below where you have imported sequelize add sequelize-batches

```javascript
const Sequelize = require('sequelize');
require('sequelize-batches');
```

## Usage

Below example queries using the new syntax

```javascript

for await (const posts of Post.batch({
  where: { userId: 1 },
  batchSize: 1000 })) {
  for (const post of posts) {
    console.log(post);
  }
}

for await (const post of Post.iterator()) {
  console.log(post);
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
```