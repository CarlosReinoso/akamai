const axios = require("axios");
require("dotenv").config();

const akamai = async (req, res) => {
  const objects = req.body?.objects;

  try {
    const test = await axios.get("http://localhost:3000/api/akamai");
    console.log("🚀 ~ akamai ~ test:", test);
    const response = await axios.post(
      process.env.AKAMAI_URL,
      {
        objects,
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
    console.log("sent!");
    res.status(201).json(response.data);
  } catch (error) {
    console.log("🚀 ~ akamai ~ error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = akamai;
