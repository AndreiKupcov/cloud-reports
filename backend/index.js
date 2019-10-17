const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const express = require("express");
const salesReports = require("./functions/salesReports");
const officeActivity = require("./functions/officeActivity");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json({ strict: false }));

app.get("/", (req, res) => {
  res.send("Healthy!");
});

app.use('/reports', salesReports);
app.use('/activity', officeActivity);

module.exports.handler = serverless(app);
