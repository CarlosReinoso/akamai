require("dotenv").config();
const axios = require("axios");
const isValidUrl = require("./util/valid/url");

const akamai = async (req, res) => {
  const objects = req.body?.objects;

  const validated = isValidUrl(objects)
  if (validated) {
    try {
      const response = await axios.post(
        process.env.AKAMAI_URL,
        {
          objects:  JSON.parse(objects)
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Cookie: process.env.COOKIE,
            "X-Xsrf-Token": process.env.TOKEN,
           
          },
        }
      );
      console.log("🚀 ~ akamai ~ response:", response.data);
      res.send(response.data.detail);
    } catch (error) {
      console.log("🚀 ~ akamai ~ error:", error);
      res.send("Server error please contanct ecommercepublishing@next.co.uk");
    }
  } else {
    res.send("Please check urls are in a new line, there are no extra quotations marks or backslashes")
  }
};

module.exports = akamai;
