require("dotenv").config();
const axios = require("axios");
const deploy = require("./routeDeployPost");

const env = async (req, res) => {
  const body = req.body?.cookieAndToken
  
  const regex = /Cookie:/;
  const parts = body[0].split(regex);
  const cookie = parts[1].replace(/^\s+/, '')

  const token = body[1].split(":")[1]

  const options = {
    method: 'PUT',
    url: `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/env-vars`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${process.env.RENDER_API}`
    },
    data: [
      { key: 'COOKIE', value: cookie },
      { key: 'TOKEN', value: token }
    ]
  };

  try {
    await axios(options);
    await deploy()
    res.status(200).json({ 
      message: 'Successfully updated environment variables',
      status: 200
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Internal server error',
      status: 500
    })
  }
};

module.exports = env;
