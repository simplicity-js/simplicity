# Simplicity
The flexible, ORM-agnostic MVC Framework for Node.js.

Simplicity brings the artistry and elegance of Laravel to Node.js.

## Table of contents

- **[Getting Started](#getting-started)**
    - **[Installation](#installation)**
    - **[Creating a Sample Project](#creating-a-sample-project)**
    - **[Running the Sample Project](#running-the-sample-project)**
- **[Motivation](#motivation)**
- **[Where can I find out more?](#where-can-i-find-out-more)**
- **[How Can I Contribute?](#how-can-i-contribute)**
- **[Project setup](#project-setup)**
- **[Development](#development)**
    - **[Automated testing](#automated-testing)**
    - **[Committing and pushing changes](#committing-and-pushing-changes)**
- **[Style-guides](#style-guides)**
    - **[Git Commit Messages](#git-commit-messages)**
- **[Help needed](#help-needed)**

## Getting Started

### Installation

```bash
$ npm install -g @simplicityjs/installer
```

### Creating a Sample Project

```bash
$ simplicity new example-app
```

### Running the Sample Project

```bash
$ cd example-app

$ npm run start:dev (or in production `node bob start`)
```

Your application is now accessible at http://localhost:8800.

## Motivation

Simplicity was created to be as simple to understand and use as possible.

Think of the various times as a developer when you have had to move between projects
that were built using different frameworks. Not only do you have to learn how the new framework
works, you also have to learn a new ORM, new routing patterns,
and get acquainted with new configuration styles.

Time that could have been spent building our product is spent learning new technologies.
And this cycle is repeated every time we move to a different project that uses a different framework.

Simplicity aims to reduce (and even completely avoid) this overhead by
sticking to popular, time tested patterns and structures.

The philosophy behind Simplicity is simple. Focus on building your product,
not on learning new routing patterns, ORMs, or ways of doing things.

If you are already using MongoDB or Sequelize as your ORM of choice,
switching to Simplicity means you don't have to start learning a new ORM,
unless, of course, you want to. You can keep using your current ORM.

As a Node.js developer familiar with routing in Express.js, you
can keep using your preferred routing patterns. Simplicity provides only a
thin layer of convenience on top of Express
and does not get in the way of what you are already doing with Express.

Similarly, if you are coming from a PHP background and have experience working with
frameworks like Laravel, you will immediately feel comfortable
because Simplicity uses similar patterns.

As the name implies, Simplicity is meant to be a simple, flexible,
easy to use framework with a near-zero learning curve.

Here's a brief comparison with a few popular framework patterns:

Take a look at this route/controller declaration:
```js
@Controller('posts')
export class PostsController {
  @Get()
  findAll(): string {
    return 'Gets all posts';
  }
}
```

If you're seeing this code for the first time, especially if you're a beginner,
chances are that you'd probably be wondering whether the `@Controller('posts')`
annotation specifies that the class is a controller
or if it handles `posts`-related routes.
You have to first dig through the documentation to know what it represents.
The same thing can be said for the `@Get()` annotation.

Contrast that with the below code in Simplicity that does something similar:
```js
router.group("posts", (router) =>
  router.get("/", [PostsController, "findAll"]);
);

module.exports = router;
```
This code is arguably simpler and more idiomatic.
It adheres to the principle of separation of concerns,
reads like plain English language, and is less mentally tasking to grasp.
Moreover, the function each part of the code is playing
is clearly visible at first glance.

Whether you're coming from a Laravel or an Express background,
this code will be immediately familiar. You don't even have to read
the documentation to understand what it's doing. Yes, it is that simple!

Again, consider this snippet of code when working with pure Express.js:
```js
const express = require('express');

const app = express();
const apiRouter = express.Router();
const v1Router = express.Router();
const usersRouter = express.Router();

usersRouter.get('/:userId', (req, res) => { /* request handler logic */ });

v1Router.use('/users', usersRouter);
v1Router.get('/auth', (req, res) => { /* request handler logic */ });

apiRouter.use('/v1', v1Router);

app.use('/api', apiRouter);
```

Now take a look at the Simplicity equivalent:
```js
const Router = require("@simplicityjs/framework/router");

const router = Router.router();

router.group('/api', (router) => {
  router.group('/v1', (router) => {
    router.group('/users', (router) => {
      router.get('/{userId}', (req, res) => { /* request handler logic */ });    
    });

    router.get('/auth', (req, res) => { /* request handler logic */ });
  });
});
```

The pure express.js version is not only visually harder to reason about,
but it becomes increasingly more complex as more routes and middleware are added.

**Note:** In place of `router.get('/{userId}', (req, res)`, you can use the
express-specific `router.get('/:userId', (req, res)`. Simplicity supports both styles
in keeping with the spirit of not getting in the way of what you already use in Express.js.

## Where can I find out more?

If all this sounds interesting and you'd like to learn more,
Check out the [documentation][].

If you think this sounds promising and you'd want to be a part of it,
you are welcome. Simplicity is still in its early stages and there's still a lot
of work to be done, features to be built, documentation to write, etc.

Whether you want to contribute or you are just curious
and just want to check out the code, you can find the [source code here][source-code].

Finally, if you find any issues or would like to make a feature request,
just create a new [issue here][issues] or pick up an existing issue
and help resolve it. Every kind of contribution is welcome.

## How Can I Contribute?

- Reporting Bugs
- Suggesting Enhancements
- Pull Requests

To report bugs or suggest enhancements, please use the [issues][issues] page.

To make pull requests:

- [setup the project](#project-setup) locally.
- make your changes;
  Please try to follow the [development](#development) guidelines while making your changes.
- [commit and push](#committing-and-pushing-changes) the changes.
- [submit the pull request][pr].


## Project setup

1.  [Fork the repo][fork] to your GitHub account.
2.  Clone the repo: `git clone https://github.com/simplicity-js/simplicity`.
3.  Navigate to the repo's directory: `cd simplicity`.
4.  Run `npm install` to install dependencies.
5.  Create a branch for your PR with `git checkout -b pr/your-branch-name`.

> Tip: Keep your `main` branch pointing at the original repository while still making
> pull requests from branches on your fork. To do this, run:
>
> ```bash
> git remote add upstream https://github.com/simplicity-js/simplicity.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This does the following:
> 1. adds the original repository as a "remote" called "upstream"
>
> 2. fetches the git information from that remote
>
> 3. sets your local `main` branch to pull the latest changes from the upstream main branch whenever you run `git pull`.
>
> Now you can make all of your pull request branches based on this local `main` branch.
>
> Whenever you want to update your local `main` branch, do a regular `git pull`.
> You can push the updated changes to your remote origin master by running `git push`.

## Development

### Automated testing

Tests are mostly co-located with the code they test. However,
you can place tests for a module in a dedicated `tests` directory
within that module. Simplicity scans the entire directory to find
files with the `.spec.js` extension.

- To run the tests, simply run `npm test`.
- To run tests with coverage reporting, run `npm run test:coverage`.

### Committing and Pushing changes
This project follows the [Conventional Commits Specification][commits] and uses [ESLint][eslint] for linting.

Before committing your changes, run `npm run lint:fix` to check and automatically fix linting errors.
If there are linting errors that cannot be automatically fixed,
they are highlighted, so that you can manually fix them.

To commit your changes, run `npm run commit`. This will:

- help generate conventional commit messages using [commitizen][commitizen] and [cz-conventional-changelog][changelog]
- check to make sure there are no linting errors
- run the tests to make sure the changes do not break existing functionality
- check that the minimum code-coverage threshold is attained
- apply the commit

Once everything checks out and the commit is applied,
you can then push your changes by running `git push -u remote pr/your-branch-name`.

You can keep making and pushing updates to your pull request branch
until you feel ready to have your changes merged into the main project.

When you are ready to have your changes merged, you can then [open a pull request][pr].

## Style guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line (subject line) to 72 characters or less.
- Reference issues and pull requests liberally after the first line.
- Consider starting the commit message with an applicable emoji:
    <!-- https://gist.github.com/parmentf/035de27d6ed1dce0b36a -->
    - :sparkles: `:sparkles:` when adding a new feature
    - :art: `:art:` when improving the format/structure of the code
    - :bookmark: `:bookmark:` when creating a version tag
    - :racehorse: `:racehorse:` when improving performance
    - :non-potable_water: `:non-potable_water:` when plugging memory leaks
    - :memo: `:memo:` when writing docs
    - :bulb: `:bulb:` when adding doc-comments to source code
    - :package: `:package:` when making a change to `package.json`
    - :penguin: `:penguin:` when fixing something on Linux
    - :apple: `:apple:` when fixing something on macOS
    - :checkered_flag: `:checkered_flag:` when fixing something on Windows
    - :bug: `:bug:` when fixing a bug
    - :ambulance: `:ambulance:` whem making a critical hot fix
    - :hammer: `:hammer:` when refactoring code
    - :wheelchair: `:wheelchair:` when making accessibility (a11y) changes
    - :fire: `:fire:` when removing code or files
    - :green_heart: `:green_heart:` when fixing the CI build
    - :white_check_mark: `:white_check_mark:` when adding tests
    - :heavy_check_mark: `:heavy_check_mark:` when making tests pass
    - :lock: `:lock:` when dealing with security
    - :arrow_up: `:arrow_up:` when upgrading dependencies
    - :arrow_down: `:arrow_down:` when downgrading dependencies
    - :shirt: `:shirt:` when removing linter warnings
    - :zap: `:zap:` when making general updates
    - :boom: `:boom:` when making breaking changes
    - :ok_hand: `:ok_hand:` code-review: okay
    - :hankey: `:hankey:` code-review: needs improvement

## Help needed

Please checkout the [the issues][issues] page for any open issues.

Also, please watch the repo and respond to questions/[bug reports][bug]/[feature requests][fr]! Thanks!







[bug]: https://github.com/simplicity-js/simplicity/labels/bug
[changelog]: https://npm.im/cz-conventional-changelog
[commitizen]: https://npm.im/commitizen
[documentation]: https://github.com/simplicity-js/simplicity/blob/main/.github/DOCUMENTATION.md
[commits]: https://conventionalcommits.org/
[eslint]: https://eslint.org/
[fork]: https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo
[fr]: https://github.com/simplicity-js/simplicity/labels/feature%20request
[issues]: https://github.com/simplicity-js/simplicity/issues
[pr]: https://docs.github.com/en/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request
[source-code]: https://github.com/simplicity-js/simplicity
