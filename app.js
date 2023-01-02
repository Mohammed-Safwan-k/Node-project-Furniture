const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

const homeRoute = require('./routes/User');
const adminRoute = require('./routes/Admin');

const app = express();

// set view engine
app.set('views', __dirname + '/views');  //or
// app.set('views',path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//session
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
}
))

//CACHE CONTROL
app.use((req, res, next) => {
    console.log('cache success');
    res.set("Cache-Control", "private,no-cache,no-store,must-revalidate");
    next();
})

// User route
app.use("/", homeRoute)

// Admin route
// app.use("/admin", adminRoute)

// Start Server
app.listen(5000, () => {
    console.log('server started at port 5000')
})