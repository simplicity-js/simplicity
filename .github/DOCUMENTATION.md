<details class="toc-container" open>

<summary>
  <h2 class="inline-block">Outline</h2>
</summary>

<div class="md-list-container toc-list">

- <a class="md-links" href="#introduction">Introduction</a>
- <a class="md-links" href="#getting-started">Getting Started</a>
    - <a class="md-links" href="#installation">Installation</a>
    - <a class="md-links" href="#creating-a-simplicity-project">
      Creating a Simplicity Project
      </a>
- <a class="md-links" href="#configuration">Configuration</a>
    - <a class="md-links" href="#config-intro">Introduction</a>
    - <a class="md-links" href="#environment-configuration">
      Environment Configuration
      </a>
    - <a class="md-links" href="#accessing-configuration-values">
      Accessing Configuration Values
      </a>
- <a class="md-links" href="#routing">Routing</a>
    - <a class="md-links" href="#routing-basics">Routing Basics</a>
    - <a class="md-links" href="#resource-controllers">Resource Controllers</a>

</div>
</details>

## Introduction
Simplicity (SimplicityJS) is a simple, easy to learn, framework for building efficient and scalable Node.js applications.
Whether you are building server-side REST APIs that serve SPA applications on the browser
or you want to build traditional full-stack applications with backend templating engines,
Simplicity has you covered.

Underneath, Simplicity makes use of [Express][] the HTTP Server framework,
providing a thin level of abstraction on top of it while still
making the Express API fully available to the developer.

Simplicity provides an out-of-the-box application architecture
that allows developers and teams to create highly testable, scalable,
loosely coupled, and easily maintainable applications.

If you are a developer coming from a PHP/Laravel background
or you like the Laravel architecture, you will immediately feel comfortable
working with Simplicity. This is because
Simplicity's architecture is heavily inspired by Laravel
and Simplicity aims to make building applications enjoyable and a breeze.

## Getting Started

### Installation
To get started, you can either scaffold the project with the [Simplicity CLI][simplicity-cli]
or clone the [starter project][starter-project].

To scaffold the project with the Simplicity CLI,
first install the CLI as a global package with the following command:
```bash
$ npm install -g @simplicity/cli
```

### Creating a Simplicity Project

<a id="creating-project-with-cli" name="creating-project-with-cli"></a>
#### Creating a new project using the Simplicity CLI (Recommended)
To create a new project using the Simplicity CLI run the following command:
```bash
$ simplicity create-project [example-app]
```

This will create a new project directory, set up a conventional base structure for your project,
and populate the directories with the initial base files required for a minimal app.

Creating a new project with the CLI is recommended for first-time users.

**NOTE**: To use the current directory as the project directory,
run the `create-project` command without passing any arguments.

Once the project has been created, start the server in development mode using
```bash
$ cd example-app

$ npm run start:dev
```

<a id="creating-project-by-cloning" name="creating-project-by-cloning"></a>
#### Alternative: Creating a new project by cloning the starter project
Alternatively, you can create a new project by cloning the starter project:
```bash
$ git clone https://github.com/simplicity-js/simplicity.git example-app
$ cd example-app
$ npm install
$ copy .env.example .env
$ npm run start:dev
```

Once you have started the development server,
your application will be accessible in your web browser at http://localhost:8800.


##### Specifying the listen port
By default, when a Simplicity project starts up, it listens on port number 8800.
You can, however, specify a different port to listen on.

There are several ways you can specify a different port to listen on:
- setting the value of the `PORT` variable inside the `.env` file
  that was created when the project was scaffolded.
- setting the `PORT` environment variable on the command line:
  ```bash
  $ PORT=<PORT>  (or `set PORT=<PORT>` on Windows)
  $ npm start
  ```
- passing the port number via the `--port` option to the `start` command on the command line:
  ```bash
  $ npm start -- --port <PORT>
  ```
- passing the port directly to `app.listen()` inside the `src/index.js` file.

**Notes:**
- The precedence order of port specification is as follows:
    - passing the port directly to `app.listen()`
    - the `--port` CLI option to the `start:*` command
    - the `PORT` environment variable on the CLI
    - the `PORT` value inside the `.env` file.
    - the default port `8800` if the port isn't specified using any
      of the other methods.

## Configuration

<a id="config-intro" name="config-intro"></a>
### Introduction
All of the configuration files for the Simplicity framework are stored inside the `src/config` directory.
Look through the files to familiarize yourself with the options available to you.

These configuration files allow you to configure things
like your database connection information, cache storage,
and various other configuration values such as your application timezone.

You can edit the available configuration files or create new configuration files as your project demands.

### Environment Configuration
It is often helpful to have different configuration values
based on the environment where the application is running.
For example, you may wish to use a sqlite database during development
while using a MySQL RDBMS in production different or
a different cache driver locally than you do on your production server.

To make this easy for you, Simplicity utilizes the [dotenv][] library.
If you [scaffolded][scaffold-with-cli] your application using the [Simplicity CLI][simplicity-cli],
the root directory will contain a `.env` file that defines many common environment variables.

If you installed your application by [cloning the starter project][cloning-the-starter-project],
the root directory will contain a `a .env.example` file instead.
You have to copy this file manually to a `.env` file using the following command:
```bash
$ cp .env.example .env
```

Simplicity's default `.env` file contains common configuration options whose values
may differ based on whether your application is running locally or on a production web server.
These values are read by the configuration files within the `config` directory
using Simplicity's built-in `env` function.

If you are developing with a team,
it is advisable to continue including and updating the `.env.example` file
as you build out your application.
Putting placeholder values in the example configuration file,
makes it easier for other developers on your team
to clearly see which environment variables are needed to run your application.

**NOTE:** Variables in your `.env` file can be overridden
by external environment variables such as environment variables defined
in your CI/CD deployment pipelines, server-level, or system-level environment variables.

### Environment Variable Types
All variables in your `.env` file are typically parsed as strings,
so some reserved values have been created to allow you to return
a wider range of types from the `env()` function:

| `.env` Value | `env()` Value |
| ------------ | --------------- |
| true         | (boolean) true  |
| (true)       | (boolean) true  |
| false        | (boolean) false |
| (false)      | (boolean) false |
| empty        | (string) ""     |
| (empty)      | (string) ""     |
| null         | (null) null     |
| (null)       | (null) null     |


### Retrieving Environment Configuration
All of the variables listed in the `.env` file will be loaded
into the Node process' environment when your application receives a request
and can be accessed using `process.env.<ENV_NAME>`. However, for convenience,
Simplicity provides the `env` function to retrieve values from these variables
in your configuration files.
If you review the Simplicity configuration files,
you will notice many of the options are already using this function:
```js
{
  ...,
  environment: env("NODE_ENV", "production"),
}
```

The second value passed to the `env` function is the "default value".
It is the value that will be returned if no environment variable exists for the given key.

### Accessing Configuration Values
You may easily access your configuration values using the framework-provided
`config.get` function from anywhere in your application.
The configuration values may be accessed using "dot" syntax,
which includes the name of the file and option you wish to access.
A default value may also be specified
and will be returned if the configuration option does not exist:
```js
const config = require("./src/config");

let value = config.get("app.timezone");

// Retrieve a default value if the configuration value does not exist...
value = config.get("app.timezone", "Africa/Lagos");
```

To set configuration values at runtime,
invoke the `config` object's `set` method:
```js
config.set("app.timezone", "UTC");
```


## Routing
Routing is the process of writing code to handle incoming HTTP requests.
A router's task is to define routes and their associated handlers.
A request handler's task is to respond to incoming HTTP requests.
In Simplicity, a request handler can be a controller instance or a closure.

### Routing Basics
[//]: # ()

Simplicity provides a simple and expressive API for defining routes and behavior.
Simplicity makes a clear separation between routes and controllers.
In fact, we don't have to define a controller class if we don't want to.
We can pass a closure to our route definitions.

In its most basic form, a Simplicity route accepts a URI and a closure.

```js
const Router = require("@simplicityjs/framework/component/router");
const router = Router.router();

router.get("/", function sayHello(req, res) {
  return res.send("Hello World!");
});
```

#### The Default Route Files
All Simplicity routes are defined in route files located in the `src/routes` directory.

If you are building a full-stack application with Simplicity,
you will begin by defining routes in your `src/routes/web.js` file.

The `src/routes/web.js` file defines routes that are for your web interface.
These routes automatically have a group of web-related middleware
applied to them that provides features like session state and CSRF protection.

To access these routes, simply enter the defined route's URL in your web browser.
For example, you may access the following route by navigating to
http://server-hostname/users in your browser:
```js
const UserController = require("../app/http/controllers/user-controller");

router.get("/users", [UserController, "index"]);

module.exports = router;
```

##### API Routes
API routes are defined inside the `src/routes/api.js` file.
These routes are stateless and have the `/api` prefix automatically applied to them,
so you do not have to manually apply the prefix to every route inside the file.
You may use a custom prefix by modifying your application's `src/bootstrap/app.js` file.

```js
routing: {
  // ...
  api: {
    prefix: "/api/admin",
    definitions: path.join(path.dirname(__dirname), "routes", "api"),
  }
  // ...
},
```

##### Available Router methods
The router lets you register routes that can respond to any HTTP verb:
```js
router.get(uri, callback);
router.post(uri, callback);
router.put(uri, callback);
router.patch(uri, callback);
router.delete(uri, callback);
router.options(uri, callback);
```

Sometimes you may need to register a route that responds to multiple HTTP verbs.
You may do so using the `some` (or `match`) method:
```js
router.some(['get', 'post'], '/', function () {
  // ...
});
```

Other times, you want to register a route that responds to all HTTP verbs.
You can achieve that using the `all` (or `any`) method:
```js
router.all('/', function () {
  // ...
});
```

**Note:** When defining multiple routes that share the same URI,
to ensure that the incoming request is matched with the correct route,
routes using the `get`, `post`, `put`, `patch`, `delete`, and `options` methods
should be defined before routes using the `any`, `match`, and `redirect` methods.

##### Dependency Injection
You may pass in any dependencies required by your route in your route's callback signature.
The declared dependencies will automatically be resolved and injected into the callback by Simplicity's service container.
For example, you may pass in the model and provider classes to have them automatically injected into your route callback:
```js
const User = require("../app/http/models/user");

router.get('/users', function (user) {
  // ...
});
```

#### Redirect Routes
To define a route that redirects to another URI, use the `router.redirect` method.
This method provides a convenient shortcut allowing you to perform a redirect
without having to define a full route or controller:
```js
router.redirect('/from', '/to');
```

By default, `router.redirect` returns a `302` HTTP status code.
You may customize the status code by passing an optional third parameter to `router.redirect`:
```js
router.redirect('/from', '/to', 301);
```

You may use the `router.permanentRedirect` method to return a `301` status code:
```js
router.permanentRedirect('/from', '/to');
```

#### View Routes
If your route only needs to return a view, the router provides a shortcut `router.view` method.
so that you do not have to define a full route or controller.
The method accepts a URI as its first argument and a view as its second argument.
Additionally, you may provide, as an optional third argument,
an object that encapsulates data to pass to the view:
```js
router.view('/dashboard', 'dashboard');

router.view('/dashboard', 'dashboard', {'role' => 'Admin'});
```
The view argument can be an absolute path to the view file or
just the view name (basename) relative to the `src/views` directory.

A template string can also be passed as the second argument, in place of a view file:
```js
const tpl = `<DOCTYPE html>
<html>
   ...
</html>
`;

router.view('/welcome', tpl, { 'name': 'Michael' });
```

### Route Parameters

#### Required Parameters
Sometimes you will need to capture segments of the URI within your route.
For example, you may need to capture a user's ID from the URL.
You may do so by defining route parameters:
```js
router.get('/user/{id}', function(req, res) {
  const userId = req.params.id;

  // Do something with userId
});
```

Route parameters may be encased within curly braces (`{}`) or prefixed with a colon (`:`)
and should consist of alphanumeric characters and underscores, aka, word characters (`[A-Za-z0-9_]`).

You may define as many route parameters as required by your route and you may
mix and match the curly braces and colon parameter styles as you wish:
```js
router.get('/posts/{post}/comments/:comment', function(req, res) {
  const post = req.params.post;
  const comment = req.params.comment;

  // Do something with post and comment
});
```

As shown in the examples, route parameters can be accessed by name
via the `params` property of the `req` object passed to the defined request handler.
The order of the route parameters do not matter:
```js
router.get('/user/{id}', function(req, res) {
  return res.send('User '. req.params.id);
});
```

##### Accessing Dependencies within Route Handlers
Simplicity makes use of [Awilix][], a powerful Dependency Injection (DI) container
for managing dependencies. You can access the DI container from within route handlers
via the `req.app` object. This object provides the `resolve` method for resolve dependencies.
For example, here's how to get a reference to an instance of the `Post` model
from a route callback or a controller method:
```js
router.get('/post/:id', function(req, res) {
  const id = req.params.id;
  const post = req.app.resolve("Post");

  post.findbyId(id);
  //...
});
```

#### Optional Parameters
To specify that a route parameter is optional and may not always be present in the URI,
placing a question mark (?) after the parameter name:

```js
router.get('/user/:name?', function(req, res) {
  return res.send(req.params.name ?? "Michael");
});
```

#### Constraining Route Parameters Specific Types
To constrain the format of your route parameters,
append a regular expression in parentheses (()):

```js
router.get('/users/{id}(\\d+)/:name([A-Za-z]+)', function(req, res) {
  // ...
});

router.get("/posts/:id([0-9]+)", function(req, res) {
  // ...
});
```

```js
const Router = require("@simplicityjs/framework/component/router");
const UserController = require("../app/http/controllers/user-controller");

const router = Router.router();

router.get("/users", [UserController, "findAll"]);
router.post("/users", [UserController, "create"]);
router.get("/users/{id}", "UserController.findAll");
router.get("/user", "UserController::findAll");
router.get("/me", { controller: UserController, method: "findAll" });

module.exports = router;
```

```js
router.middleware((req, res, next) => {
  console.log("Middleware called");
  next();
}, (router) => {
  router.get("/first", (req, res) => res.send("first"));
  router.get("/second", (req, res) => res.send("second"));
  router.get("/third", (req, res) => res.send("third"));
});
```

```js
router.controller({
  index: (req, res) => res.send("users list"),
  new: (req, res) => res.send("new user form"),
  create: (req, res) => res.send("create user"),
  show: (req, res) => res.send("show user"),
  edit: (req, res) => res.send("edit user form"),
  update: (req, res) => res.send("update user"),
  destroy: (req, res) => res.send("destroy user"),
}, (router) => {
  router.get("/users", "index");
  router.get("/users/new", "new");
  router.get("/users/{id}", "show");
  router.post("/users/", "create");
  router.get("/users/{id}/edit", "edit");
  router.put("/users/{id}", "update");
  router.patch("/users/:id", "update");
  router.delete("/users/{id}", "destroy");
});
```

```js
router.resource("posts", {
  index: (req, res) => res.send("index"),
  new: (req, res) => res.send("new"),
  create: (req, res) => res.send("create"),
  show: (req, res) => res.send("show"),
  edit: (req, res) => res.send("edit"),
  update: (req, res) => res.send("update"),
  destroy: (req, res) => res.send("destroy"),
});
```

### Resource controllers
```js
router.resource("posts", controller); // will produce:

router.get("posts/", controller.index);
router.get("posts/new", controller.new);
router.get("posts/:id", controller.show);
router.post("posts/", controller.create);
router.get("posts/{id}/edit", controller.edit);
router.put("posts/:id", controller.update);
router.patch("posts/:id", controller.update);
router.delete("posts/:id", controller.destroy);
```






[awilix]: https://www.npmjs.com/package/awilix
[cloning-the-starter-project]: #creating-project-by-cloning
[dotenv]: https://www.npmjs.com/package/dotenv
[express]: https://expressjs.com/
[scaffold-with-cli]: #creating-project-with-cli
[simplicity-cli]: https://www.npmjs.com/package/@simplicityjs/cli
[starter-project]: https://github.com/simplicity-js/simplicity
