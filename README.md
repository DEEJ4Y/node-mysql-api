# Node, Express, MySQL RESTful API

[API docs](https://documenter.getpostman.com/view/24030370/2s935kQ6hf)

This is an example project for working with nodejs, express and mysql.

## Installation

- Clone this repository.
- Install the dependencies.

  ```sh
  npm install
  ```

- Configure the environment variables.

  Rename `example.env` to `.env` and add your own MySQL database credentials.

- Run the dev server.

  ```sh
  npm run dev
  ```

You should be able to see similar output once your server is running.

```sh
Server started on port 3000.
Connected to MySQL server @ 127.0.0.1
Initialized books table.
```

## Project structure

### `📁controllers`

Handle requests, business logic and responses.

### `📁loaders`

Code that runs on app startup.

### `📁models`

Handle database table schemas and table initialization.

### `📁routes`

Map endpoints to controllers.

### `📁services`

Database queries or 3rd party API requests.

### `📁utils`

Utility functions, helpers and wrappers.

### `📄server.js`

App entry point.
