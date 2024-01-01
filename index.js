// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

const bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:year/:month/:day", (request, response) => {
  const gmt = new Date(
    Number(request.params.year),
    Number(request.params.month),
    Number(request.params.day),
  );

  console.log(gmt);

  if (gmt instanceof Date && isFinite(gmt)) {
    response.json({
      unix: Number(request.params.unix),
      utc: gmt.toUTCString(),
    });
  } else {
    response.json({ error: "Invalid Date" });
  }
});

app.get("/api/", (_, response) => {
  const d = new Date();
  response.json({
    unix: d.getTime(),
    utc: d.toUTCString(),
  });
});

app.get("/api/:unix", (request, response) => {
  let gmt = null;

  if (request.params.unix.includes("-")) {
    gmt = new Date(request.params.unix);
  } else if (!isNaN(parseInt(Number(request.params.unix)))) {
    gmt = new Date(Number(request.params.unix));
  } else {
    gmt = new Date(request.params.unix);
  }

  console.log(request.params.unix);

  if (gmt instanceof Date && isFinite(gmt)) {
    response.json({
      unix: gmt.getTime(),
      utc: gmt.toUTCString(),
    });
  } else {
    response.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
