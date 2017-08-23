# Sequelize Batches/Iterators

*Note: depends on async generators*

works with Node 8.4.0 ```node --harmony-async-iteration```

```javascript
for await (const posts of Post.batch({ supplierId }, { size: 10000 })) {
  for (const post of posts) {
    console.log(post);
  }
}

for await (const post of Post.iterator()) {
  console.log(post);
}
```