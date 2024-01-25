const axios = require("axios");
require("dotenv").config();

const akamai = async (req, res) => {
  const objects = req.body?.objects;

  try {
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
    res.status(201).json(response.data);
  } catch (error) {
    console.log("🚀 ~ akamai ~ error:", error);
    res.status(500).json({ httpStatus: 500, message: "Internal Server Error" });
  }
};

module.exports = akamai;
