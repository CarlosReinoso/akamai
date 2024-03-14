require("dotenv").config();
const axios = require("axios");
console.log("🚀 ~ akamai ~ process.env.COOKIE:", process.env.COOKIE)
console.log("🚀 ~ akamai ~ process.env.TOKEN:", process.env.TOKEN)


const akamai = async (req, res) => {
  const objects = req.body?.objects;
  console.log("🚀 ~ akamai ~ objects:", objects)

  try {
    const response = await axios.post(
      "https://control.akamai.com/portal-ccu-api/services/v1/delete/urls/production",
      {
        objects: [
          "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/Search/676/D69295.jpg?im=Resize,width=350?lll",
          "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/Search/676/798871.jpg?im=Resize,width=350?kkj",
          "https://xcdn.next.co.uk/Common/Items/Default/Default/ItemImages/Search/676/T14951.jpg?im=Resize,width=350?kkk"
        ]
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Cookie: process.env.COOKIE,
          "X-Xsrf-Token": process.env.TOKEN,
          "User-Agent": "PostmanRuntime/7.26.8",
          Host: "control.akamai.com",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Content-Length": 270
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
