const express = require('express');
const bodyParser = require('body-parser');
const akamaiRoute = require("./routeAkamaiPost")

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/api/akamai', akamaiRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
