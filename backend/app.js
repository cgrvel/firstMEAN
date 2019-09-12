const express = require ('express');
const bodyParser = require ('body-parser');
const app = express();
const postsRoutes = require ('./routes/posts');
const userRoutes = require ('./routes/user');
const mongoose = require ('mongoose');
const path = require ('path');

//mongoose.connect('mongodb://localhost/node-angular', { useNewUrlParser: true })
mongoose.connect("mongodb+srv://game:" + process.env.MONGO_ATLAS_PWD + "@cluster0-v9f6w.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Connection failed',err);
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', express.static(path.join(__dirname, 'angular')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, X-Requested-With, Authorization'
    );

  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
app.use((req, res, next) => {
  res.sendfile(path.join(__dirname, "angular", "index.html"));
});
module.exports = app;
