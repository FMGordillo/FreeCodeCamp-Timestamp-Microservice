// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// app.get("/api/timestamp", function (req, res) {
//   res.status(400).send('A Bad Request 🤷‍♂️, it should be /api/timestamp/{SOME_DATE}');
// });

function formatDate(date) {
  return moment(date).utc().format('ddd, DD MMM YYYY HH:MM:SS z')
}

app.get("/api/timestamp/:date_string?", function (req, res) {
  var date = req.params.date_string;
  
  
  if(!date) return res.json({
    unix: parseInt(moment().format('x')),
    utc: moment().utc().format('ddd, DD MMM YYYY HH:MM:SS z')
  })
  
  date = new Date(date)
  
  // Moment.js makes the checking for me
  if(formatDate(date) === 'Invalid date') {
    return res.json({unix : null, utc: formatDate(date) })
  }
  
  return res.json({
    unix: parseInt(moment(date).format('x')),
    utc: formatDate(date)
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});