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
        - <a class="md-links" href="#creating-project-with-cli">
          Creating a new project using the Simplicity CLI (Recommended)
          </a>
        - <a class="md-links" href="#creating-project-by-cloning">
          Alternative: Creating a new project by cloning the starter project
          </a>
- <a class="md-links" href="#configuration">Configuration</a>
    - <a class="md-links" href="#config-intro">Introduction</a>
    - <a class="md-links" href="#enviromnent-configuration">
      Environment Configuration
      </a>
    - <a class="md-links" href="#accessing-configurtion-values">
      Accessing Configuration Values
      </a>
- <a class="md-links" href="#routing">Routing</a>
    - <a class="md-links" href="#resource-controllers">Resource Controllers</a>

</div>
</details>

## Introduction
Simplicity (SimplicityJS) is a framework for building efficient, scalable Node.js applications.
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
Simplicity architecture is heavily inspired by Laravel
and Simplicity aims to make building applications enjoyable and a breeze.

## Getting Started

### Installation
To get started, you can either scaffold the project with the [Simplicity CLI][],
or clone the [starter project][].

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

$ npm run dev
```

<a id="creating-project-by-cloning" name="creating-project-by-cloning"></a>
#### Alternative: Creating a new project by cloning the starter project
Alternatively, you can create a new project by cloning the starter project:
```bash
$ git clone https://github.com/simplicity-js/simplicity.git example-app
$ cd example-app
$ npm install
$ copy .env.example .env
$ npm run dev
```

Once you have started the development server,
your application will be accessible in your web browser at http://localhost:[PORT].

where `[PORT]` is the port number specified inside the `.env` file
that was created when the project was scaffolded.

You can also specify a port in one of the following ways:
  - on the command line by setting the `process.env.PORT` environment variable:

    `process.env.PORT=<PORT>`
    `npm run serve`.
  - on the command line by passing the `port` option to the `serve` command like so:

    `npm run serve -- --port <PORT>`

  where `<PORT>` is the port number to use.

**Notes:**
  - The precedence order of port specification is as follows:
      - the `port` options to the `serve` command
      - `process.env.PORT`
      - the `PORT` value inside the `.env` file.
  - If no port is specified
    either via the environment variable (`.env` file or `process.env.PORT`)
    or via the `port` option during the `serve` command,
    the application defaults to using port `8800`.


## Configuration

<a id="config-intro" name="config-intro"></a>
### Introduction
All of the configuration files for the Simplicity framework are stored in the config directory.
Look through the files to familiarize yourself with the options available to you.

These configuration files allow you to configure things
like your database connection information, cache storage,
and various other configuration values such as your application timezone.

### Environment Configuration
It is often helpful to have different configuration values
based on the environment where the application is running.
For example, you may wish to use a sqlite database during development
while using a MySQL RDBMS in production different or
a different cache driver locally than you do on your production server.

To make this easy for you, Simplicity utilizes the [dotenv][] library.
If you [scaffolded][scaffold-with-cli] your application using the [Simplicity CLI][],
the root directory will contain a `.env` file that defines many common environment variables.

If you installed your application by [cloning the starter project][],
the root directory will contain a `a .env.example` file instead.
You have to copy this file manually to a `.env` file using the following command:
```bash
$ cp .env.example .env
```

Simplicity's default `.env` file contains common configuration options whose values
may differ based on whether your application is running locally or on a production web server.
These values are read by the configuration files within the `config` directory
using Simplicity's `env` function.

If you are developing with a team,
it is advisable to continue including and updating the `.env.example` file
as you build out your application.
By putting placeholder values in the example configuration file,
you make it easier for other developers on your team
to clearly see which environment variables are needed to run your application.

**NOTE:** Variables in your `.env` file can be overridden
by external environment variables such as environment variables defined
in your CI/CD deployment pipelines, server-level, or system-level environment variables.

### Environment Variable Types
All variables in your `.env` files are typically parsed as strings,
so some reserved values have been created to allow you to return
a wider range of types from the `env()` function:

| `.env` Value | env() Value |
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






[cloning-the-starter-project]: #creating-project-by-cloning
[dotenv]: https://www.npmjs.com/package/dotenv
[express]: https://expressjs.com/
[scaffold-with-cli]: #creating-project-with-cli
[simplicity-cli]: https://www.npmjs.com/package/@simplicityjs/cli
[starter-project]: https://github.com/simplicity-js/simplicity
