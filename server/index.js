var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mysql');
var axios = require('axios');
var session = require("express-session");
var bcrypt = require("bcrypt");
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.use(
  session({
    secret: "this-is-a-secret-token",
    cookie: { maxAge: 600000 * 1000 },
    resave: true,
    saveUninitialized: true
  })
);

const auth = function(req, res, next) {
  console.log(req.session);
  if (!req.session.email) {
    res.send({
      notLoggedIn: true
    })
    return
  } else {
    next();
  }
}

app.get('/checkLogin', function(req, res) {
  res.send({notLoggedIn: !req.session.email, HELLOOO: req.session})
})

app.post("/signup", function(req, res) {
  var sqlQuery = `INSERT INTO claimer (email, cPassword, address) VALUES (?,?,?)`;

  const saltBae = 10;
  bcrypt.hash(req.body.password, saltBae, (error, hash) => {
    var placeholderValues = [req.body.username, hash, req.body.address];
    db.query(sqlQuery, placeholderValues, function(error) {
      if (error) {
        throw error;
      } else {
        res.send();
      }
    });
  })
});

app.post("/login", function(req, res) {
  var sqlQuery = `SELECT email, cPassword FROM claimer WHERE email="${req.body.username}"`;
  db.query(sqlQuery, function(error, results) {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      console.log("Could not find user length is 0")
      res.status(404).send();
    } else {
      bcrypt.compare(req.body.password, results[0].cPassword, (error, result) => {
        if (error) {
          res.send(error);
        } else if (result === true) {
          console.log(result);
          req.session.regenerate(() => {
            req.session.email = req.body.username;
            res.end();
          });
        } else {
          res.status(404).send();
        }
      })
    }
  });
});

app.post('/logout', auth, function(req, res) {
  req.session.destroy();
  res.end();
})

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

