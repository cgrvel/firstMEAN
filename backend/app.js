const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin, Accept, Content-Type, X-Requested-With'
    );
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post Added Successfully'
  });
});

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
