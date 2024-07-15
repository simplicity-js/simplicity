const { STATUS_CODES, STATUS_TEXTS } = require(
  "@simplicityjs/framework/component/http");

const Router = require("@simplicityjs/framework/component/router");

const router = Router.router();


router.get("/", (req, res) => res.status(STATUS_CODES.HTTP_OK).json({
  success: true,
  message: STATUS_TEXTS[STATUS_CODES.HTTP_OK],
}));


module.exports = router;
