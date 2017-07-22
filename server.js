// Copy out app credentials viz
// App ID, Key, Secret and Cluster

// npm install -S express body-parser pusher

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

const Pusher = require('pusher');
const pusher = new Pusher({
  appId: '371038',
  key: '3b152a07840beb63b9d1',
  secret: '10f0397681f4e2401d4c',
  cluster: 'us2'
})

//post route for creating reviews
app.post('/review', (req, res) => {
  pusher.trigger('reviews', 'review_added', {review: req.body});
});
req.status(200).send();

const port = 5000;
app.listen(port, () => {
  console.log( `App listening on port ${port}!`)
});
