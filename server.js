const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');

const app = express();

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: false,
  verbose: true,
  rewrites: [
    { from: '/.well-known/acme-challenge/zS6LSAsjsg4o5mw3seW-Qv92tPY2lfkTGXZRU0mlQLs', to: '/cert.html'}
  ]
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist'));
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
