const urlValidator = require("valid-url");
const axios = require("axios");
require("dotenv").config();
console.log("🚀 ~ akamai ~ process.env.COOKIE:", process.env.TOKEN);

const akamai = async (req, res) => {
  const urls = req.body?.urls;
  console.log("🚀 ~ akamai ~ urls:", urls);

  try {
    const response = await axios.post(
      process.env.AKAMIA_URL,
      {
        objects: urls,
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
    res.status(201).send("success");
  } catch (error) {
    console.log("🚀 ~ akamai ~ error:", error);
    console.error("error:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = akamai;
