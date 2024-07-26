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






[express]: https://expressjs.com/
[simplicity-cli]: https://www.npmjs.com/package/@simplicityjs/cli
[starter-project]: https://github.com/simplicity-js/simplicity
