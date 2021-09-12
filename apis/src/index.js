const express = require("express");
const routes = require("./routes");
const config = require("./config");
const logger = require("./helpers/logger");
const mongo = require("./helpers/mongo");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mws = require("./middlewares");

function server() {
  const app = express();
  const http = require("http").Server(app);
  const io = require("socket.io")(http, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["content-type", config.get("auth.header")],
      exposedHeaders: [config.get("auth.header")],
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
  
    socket.on("join-room", function (data) {
      socket.join(data._id);
      logger.app("room-joined");
    });
  
    socket.on("message", (data) => {
      socket.to(data.channelId).emit("add-message",{
        message: data.message,
        channelId:data.channelId
      });
    });
  });

  app.use(morgan("combined"));
  app.use(bodyParser.json({}));
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  app.use(mws.auth.parse);

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
      allowedHeaders: ["content-type", config.get("auth.header")],
      exposedHeaders: [config.get("auth.header")],
    })
  );

  app.use("/api/users", routes.users);
  app.use("/api/channels", routes.channels);

  app.use("*", function (req, res) {
    res.status(404).json({
      error: "api.NOT_FOUND",
      message: "API not found",
    });
  });

  app.use(function (err, req, res, next) {
    logger.app(err);
    logger.debug("request: %o", {
      body: req.body,
      path: req.path,
      params: req.params,
    });
    res.status(500).json({
      error: "api.UNKNOWN",
      message: "Something bad happened",
    });
  });

  http.listen(8080, () => {
    logger.debug("port is %d", 8080);
    logger.app("Listening on %d", 8080);
  });
}

async function boot() {
  await mongo.connect();
  server();
}

boot().catch((ex) => {
  logger.app(ex);
  process.exit(1);
});
