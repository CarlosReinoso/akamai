const express = require("express");
const bodyParser = require("body-parser");
const akamaiRoute = require("./routeAkamaiPost");
const envRoute = require("./routeENVPut");
const reload = require('reload');
const deploy = require('./routeDeployPost');

const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/pages/index.html");
});

app.get("/env", (req, res) => {
  res.sendFile(__dirname + "/client/pages/env.html");
});
app.get('/deploy', async (req, res) => {
  try {
    await deployService();
    res.status(200).send('Deployment initiated');
  } catch (error) {
    res.status(500).send('Deployment failed');
  }
});

app.post("/api/akamai", akamaiRoute);
app.post("/api/env", envRoute);

// Use reload to enable hot reloading
reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README

  // Start the server after enabling hot reloading
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err);
});
