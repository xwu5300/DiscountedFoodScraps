var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
const url = 'https://discountedfoodscraps.firebaseio.com/restaurants.json'
const cartUrl = 'https://discountedfoodscraps.firebaseio.com/cart.json'

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/restaurant', (req, res) => {
  axios.get(url)
       .then((response) => {
         res.send(response.data)
       })
       .catch((err) => {
         console.log('err', err)
       })
})
app.post("/sendFormData", function(req, res) {
  axios.post(url, req.body)
       .then(() => { 
        console.log('working')
        res.send()
      }).catch(()=>{console.log('bad')})
}); 

app.patch('/restaurant', (req, res) => {
  axios.patch(`https://discountedfoodscraps.firebaseio.com/restaurants/${req.body.id}.json`, {quantity: req.body.qty}) 
  .then(() => res.send())
  .catch((err) => console.log('err', err))
})

app.delete('/restaurant', (req, res) => {
  axios.delete(`https://discountedfoodscraps.firebaseio.com/restaurants/${req.query.id}.json`)
  .then(() => res.send())
  .catch((err) => console.log('err', err))
})

app.get('/cart', (req, res) => {
  axios.get(cartUrl)
       .then((response) => {
         res.send(Object.values(response.data))
       })
       .catch((err) => {
         console.log('err', err)
       })
})

app.post('/cart', (req, res) => {
  axios.post(cartUrl, req.body)
       .then(() => {
         console.log('addd to cart')
         res.send()
       })
       .catch((err) => {
         console.log('err', err)
       })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

