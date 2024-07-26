const Router = require("@simplicityjs/framework/component/router");
const { download, view } = require("@simplicityjs/framework/component/view");

const router = Router.router();

router.get("/", (req, res) => {
  const config = req.app.resolve("config");
  const appName = config.get("app.name");
  const githubUrl = "https://github.com/simplicity-js/simplicity";
  const documentationUrl = `${githubUrl}/blob/main/.github/DOCUMENTATION.md`;

  /*
   * Send view variables either via res.locals ...
   */
  res.locals.pageTitle = appName;
  res.locals.githubUrl = githubUrl;
  res.locals.documentationUrl = documentationUrl;
  res.locals.gettingStartedUrl = `${documentationUrl}#getting-started`;
  res.locals.pageTagline = "Feature-rich MVC Framework for Node.js";

  /*
   * ... or as via the view variabls options object
   * of the view method
   */
  return view("home", { appName });
});

router.get("/download", () => download("home.pug"));

module.exports = router;
