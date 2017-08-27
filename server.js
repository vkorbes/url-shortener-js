var express = require('express')
var mongo = require('mongodb').MongoClient
var path = require('path')
var validurl = require('valid-url')
var math = require('mathjs')
var app = express()
var mongouri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;

app.get('/new/:url(*)', (request, response, next) => {
  if (validurl.isWebUri(request.params.url)){
    var original_url = request.params.url
    newNum(request, response, original_url)
  } else {
    response.json({
    "error": "Invalid URL."
    })
  }
})

function newNum (request, response, original_url) {
  mongo.connect(mongouri, function(err, db) {
      if (err) throw err
      db.collection('urls').find().toArray((err, data) => {
        if (err) throw err
        var aliases = data.map((obj) => { return obj.alias })
        do { var number = newRandom() } while (aliases.indexOf(number) != -1);
        addNewEntry(request, response, original_url, number, db)        
      })
  })
}

function newRandom () {
    return math.floor(Math.random()*10000).toString()
}
    
function addNewEntry (request, response, original_url, number, db) {
    var short_url = "https://url-shortener-js.glitch.me/" + number
    var newEntry = [{
          "alias": number,
          "original_url": original_url,
          "short_url": short_url
    }]
      db.collection('urls').insert(newEntry, function(err, result) {
        if (err) throw err
            console.log(result)
            db.close()
        })
    response.json({
          "original_url": original_url,
          "short_url": short_url
    })
}

app.get('/:redirect', (request, response, n) => {
  var redirect = request.params.redirect
  mongo.connect(mongouri, function(err, db) {
    if (err) throw err
    db.collection('urls').find({'alias': redirect }).toArray( function(err, data) {
      if (err) return response.send(err)
      if (data.length) {
        response.redirect(data[0].original_url)
      } else {
        response.redirect('/')
      }
    })
  })
})

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
})

var listener = app.listen(3000, () => {
  console.log('Listening on port ' + listener.address().port);
})
