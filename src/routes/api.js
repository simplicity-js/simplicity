const { STATUS_CODES, STATUS_TEXTS } = require(
  "@simplicityjs/framework/component/http");
const Router = require("@simplicityjs/framework/component/router");
const serverStatus = require("../app/http/middleware/server-status");

const router = Router.router();


router.get("/", (req, res) => res.status(STATUS_CODES.HTTP_OK).json({
  success: true,
  message: STATUS_TEXTS[STATUS_CODES.HTTP_OK],
}));

router.get({ uri: "/server-status", middleware: serverStatus }, (req, res) => {
  const config = req.app.resolve("config");
  const { application, server } = res.serverState;
  const { status, uptime, utilization } = server;

  return res.json({
    application: {
      ...application,
      name: config.get("app.name"),
    },
    server: {
      status,
      uptime,
      utilization,
    },
  });
});

module.exports = router;
