const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();


//express app
const app = express();

//Connect to MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
    .then(result => app.listen(3000, () => {
        console.log('Server is running on port 8000');
    }))
    .catch(err => console.log(err));


//register view engine
app.set('view engine', 'ejs');


//Middleware and Static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies



// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
  
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});
  
  // blog routes
app.use('/blogs', blogRoutes);
  
  // 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});