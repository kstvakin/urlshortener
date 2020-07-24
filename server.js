const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8000;
const AssistantV2 = require("ibm-watson/assistant/v2");
const db = require("./Helper/db");
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const homeRoutes = require('./api/routes/home');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use('/', homeRoutes);

http.listen(port, function () {
  console.log("Server started on :" + port);
});
