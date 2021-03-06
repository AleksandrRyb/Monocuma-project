const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controlers/signin');
const register = require('./controlers/register');
const profile = require('./controlers/profile');
const image = require('./controlers/image');


const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());




app.get('/', (req,res) => {res.send("database")})
app.post('/signin',(req, res) => { signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register',(req, res) => { register.handleRegister(req, res, db, bcrypt )})
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => { image.handlerImage(req, res, db)})
app.post('/imageUrl', (req, res) => { image.handlerImageUrl(req, res)})




app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started!!");
})
