# Node backend with koa

A small project to put in practice some concepts about JWT auth and safety issues.

## Getting Started

Clone the repo and run:

```
npm installs
```

To run it, use:

```
$ nodemon server.js
```

### Prerequisites


```
$ node -v
v12.2.0
$ npm -v
6.10.1
```

## Running the tests

Currently with no tests (sorry...)

## Database

Currently using Postgres with knex.

```
$ psql --version
psql (PostgreSQL) 10.9
```

### Migrations

To run the migration:
```
$ npx knex migrate:latest
```

### Seeds

To run the seed
```
$ npx knex seed:run
```
