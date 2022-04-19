const express = require('express')
const indexRouter = require("./routes/index.js");
const userManagmentRouter = require("./routes/user-managment.js")
const port = 3000
require('dotenv').config()

const app = express()

app.set("views","views");
app.set("view engine", "ejs");
app.use(express.json());

const { auth, requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: 'https://dev-ztdc77sd.us.auth0.com',
    baseURL: 'http://jedrzejnowaczyk.pl:3000' ,
    clientID: 'x0pkH05DZOC4Yv8ySr9TtSqrnMdEOZ6o',
    secret: '636463463464ggdsert55235253wteewetwetwet',
    idpLogout: true,
  })
);

app.use('/', indexRouter);

app.get('/callback', (req, res) => {
    res.send('')
})

app.get('/logout', (req, res) => {
  res.send('')
})

app.get('/user-managment', userManagmentRouter);



app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

app.listen(port)