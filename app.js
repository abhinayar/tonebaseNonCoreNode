var express = require('express'),
  path = require('path'),
  http = require('http'),
  hbs = require('hbs');

var app = express()
app.set('port', process.env.PORT || 8080)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(__dirname + '/static/'))

app.get('/', function(req, res) {
  res.redirect('/comingSoon');
})
app.get('/comingSoon', function(req, res) {  
  //EDIT THIS FILE
  var landingContent = require(__dirname + '/dynamicContent/landingPage.json');
  res.render('landing', {
    content : landingContent
  });
})
        
app.listen(app.get('port'), function(){
  console.log('tonebase app listenting on port ' + app.get('port'));
})