# Using dotenv to hide your secrets
# N

`.env` should be part of your .gitignore:

```sh
echo ".env" >> .gitignore # creates if it does not exist, otherwise appends!
git add .gitignore
git commit -am 'ignores .env'
```


```sh
npm i dotenv
```

## Tell your app to load info from `dotenv`

At the top of `index.js`

```js
require('dotenv').config(); // loads your info from the .env file in your project
```


## Tell `sequelize` to use `dotenv`

You'll need to create a `.sequelizerc` file with the following (for `sequelize-cli`):

```js
use strict';

require('dotenv').config();    // don't forget to require dotenv
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js'),
  'models-path': path.resolve('models'),
  'seeders-path': path.resolve('seeders'),
  'migrations-path': path.resolve('migrations'),
};
```

It should be part of the project and therefore, added to git:

```sh
git add .sequelizerc
```

## Create a `config.js` that uses environment variables

And then create a `config/config.js` with:

```js
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
        host: process.env.DB_HOST,
    dialect: 'postgres',
  }
};
```

## Create your `.env` file

Create your `.env` file with the following:

```
DB_USER=abcdef
DB_PASSWORD=abcdef
DB_NAME=abcdef
DB_HOST=abc.elephantsql.com
```
Make sure there are NO SPACES before or after the `=`.
This isn't JavaScript, it's "shell".
Use the values correct values, of course. 


## If updating a project, update `models/index.js`.

Change the `require()` for `config.json` to `config.js`

After confirming that it works, delete `config/config.json`.


## Pro-tip: add a `dist.env` to git

It should show all the environment variables you use in your app, but with blank values:

```
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
```

Then:

```sh
git add dist.env
git commit -am 'adds example .env file'
```
