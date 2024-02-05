require("dotenv").config();
const axios = require('axios');

const deploy = async (req, res) => {
  try {
    const options = {
      method: 'POST',
      url: `https://api.render.com/v1/services/${process.env.RENDER_SERVICE_ID}/deploys`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.RENDER_API}`
      },
      data: { clearCache: 'do_not_clear' }
    };

    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error('Deployment error:', error);
    res.status(500).send('Deployment failed');
  }
};

module.exports = deploy;