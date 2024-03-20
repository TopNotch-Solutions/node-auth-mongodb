const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {checkUser,requireAuth} = require('./middleware/authMiddleware');
const app = express();

//midlewares here
 app.use(express.static('public'));
 app.use(express.json());
 app.use(cookieParser());

//view engine
app.set('view engine', 'ejs');

//database connection
const dbURI = 'mongodb://127.0.0.1:27017/node-auth';
mongoose.connect(dbURI)
.then((result)=>{
    app.listen(3000);
    console.log('listening');
})
.catch((err)=>{
    console.log(err);
});

//routes
app.get('*', checkUser);
app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/smoothies', requireAuth, (req,res)=>{
    res.render('smoothies');
});
app.use(authRoutes);













// just for demonstration 
app.get('/set-cookies',(req,res)=>{
    //res.setHeader('Set-Cookie',['newUser=paulus','jwtt=dsjfbdsjnbcdkcbkjdnjkdbjkdsnlndsdlndlkdndwlknd']);
    res.cookie('newUser', false);
    res.cookie('isEmployeed', true,{maxAge: 1 * 60 * 1000, httpOnly: true}), // milisecond
    // res.cookie('isEnabled', true,{secure:true}) // only apply the cookie over a secure network https
    res.send('You are authenticated user!')
});

app.get('/read-cookies',(req,res)=>{
    const cookies = req.cookies;

    console.log(cookies.newUser);
    res.json(cookies)
})