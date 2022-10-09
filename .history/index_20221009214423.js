const express = require('express');
const path = require('path');
const port = 4000;
const app = express(); 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demodatabase')

const userSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String,
    email: String
})

const User = mongoose.model('User', userSchema, 'users')

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res)=>{
    res.status(200).render('trial.pug');
})

app.post('/', (req, res)=>{
    let myData = new User(req.body);
    myData.save().then(()=>{
        res.render('trial.pug')
    }).catch(()=>{
        res.status(400).send('Item was not saved to the database');
    })
})

app.listen(port, ()=>{
    console.log(`Server successfully running at port ${port}`);
})