var express = require('express')
var app = express();

var yelp = require("yelp").createClient({
  consumer_key: "ftshNXQkAohDq7_ecHFWUA",
  consumer_secret: "2zmgQbtu05KdyWzHeBP3CLX_m40",
  token: "eXIuf0Ut7ACI7FwEiTHxunveZOg5_igE",
  token_secret: "BqhWs8B6RMn-OWWpkYl4SpN-LyM"
});

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  //res.sendfile(__dirname + '/public/index.html');
})

app.get('/yelp', function(req, res) {
  yelp.search({term: "pet stores", location: "portland, oregon"}, function(error, data) {
    console.log(error);
    console.log(data);
    res.send(data);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
