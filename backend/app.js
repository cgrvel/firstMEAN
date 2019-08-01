const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const Post = require ('./models/post');
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost/node-angular', { useNewUrlParser: true })
//mongoose.connect('mongodb+srv://game:gBWl0rKwyiFLMQEq@cluster0-v9f6w.mongodb.net/node-angular?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Connection failed',err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, X-Requested-With'
    );

  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
  next();
});

app.post('/api/posts',(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post Added Successfully',
      postId: createdPost._id
    });
  });

});

app.get('/api/posts',(req, res, next)=>{
  Post.find()
  .then(documents => {
    console.log('get: ',documents);
    res.status(200).json({
      message: 'Post sent Successfully',
      posts: documents
    });
  });
});


app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!',
      });
    }
  });
});

app.delete('/api/posts/:id',(req, res, next) => {
  Post.deleteOne({_id: req.params.id})
  .then(result => {
    console.log('delete: ',result);
    res.status(200).json({
      message: 'Post Deleted'
    });
  });
});

app.put('/api/posts/:id',(req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id }, post)
  .then(result => {
    console.log('put: ',result);
    res.status(200).json({
      message: 'Post Updated'
    });
  });
});

module.exports = app;
