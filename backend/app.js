const express = require ('express');

const app = express();

app.use('/api/posts',(req, res, next)=>{
  const posts =[
    {
      id:"1234",
      title: "Harry potter",
      content: "Part 1"
    },
    {
      id:"5678",
      title: "Harry potter",
      content: "Part 2"
    }
  ]
  res.status(200).json({
    message: 'Post sent Successfully',
    posts: posts
  });
});

module.exports = app;
