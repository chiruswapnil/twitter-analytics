//mongoimport --db twitterdb --collection twitterCollection --type json --file myTwitterData.json --jsonArray

var http = require('http');
var hostname = 'localhost';
var port = 3000;
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/twitterdb";


var responseJSON = null;
mongo.connect(url, function(err, db) {
    if (err) {
        throw err;
    } else {
        var col = db.collection('twitterCollection');
        col.find().toArray(function(err, documents) {
            if(err){
                throw err;
            } else {
                //console.log(documents);
                responseJSON = documents;
            }
            db.close();
        });
    }
});



var server = http.createServer(function(req, res){
  console.log(req.headers);
  
  res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  res.end(JSON.stringify(responseJSON));
  }) 

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});