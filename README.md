# Simplicity
A Modern MVC Framework for Node.js


## Running
- `npm run serve`:
  This will start the app and listen on the `PORT` as specified inside the `.env` file.

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


## Development

### Automated testing
Tests are located inside the `tests` directory.

- To run the tests, simply run `npm test`.
- To run tests with coverage reporting, run `npm run test:coverage`.

### Committing and Pushing changes
This project follows the [Conventional Commits Specification][commits] and uses [ESLint][eslint] for linting.

Before committing your changes, run `npm run lint:fix` to check and automatically fix linting errors.
If there are linting errors that cannot be automatically fixed,
they are highlighted, so that you can manually fix them.

To commit your changes, run `npm run commit`. This will:

- generate conventional commit messages using [commitizen][commitizen] and [cz-conventional-changelog][changelog]
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
