var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var app = express();
const url = 'https://discountedfoodscraps.firebaseio.com/restaurants.json'

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
  console.log(req.body)
  axios.post(url, req.body)
       .then(() => { 
        console.log('working')
        res.send()
      }).catch(()=>{console.log('bad')})
}); 

app.patch('/restaurant', (req, res) => {
  console.log('req.body', req.body)
  axios.patch(`https://discountedfoodscraps.firebaseio.com/restaurants/${req.body.id}.json`, {quantity: req.body.qty}) 
  .then(() => res.send())
  .catch((err) => console.log('err', err))
})

app.delete('/restaurant', (req, res) => {
  console.log('delete req.query', req.query)
  axios.delete(`https://discountedfoodscraps.firebaseio.com/restaurants/${req.query.id}.json`)
  .then(() => res.send())
  .catch((err) => console.log('err', err))
})


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

