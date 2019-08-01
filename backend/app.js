const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const postsRoutes = require ('./routes/posts');
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

app.use('/api/posts', postsRoutes);

module.exports = app;
