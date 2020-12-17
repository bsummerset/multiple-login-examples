# Using dotenv to hide your secrets

- Never put your API keys, usernames, or passwords on GitHub
  - i.e., add `.env` to your `.gitignore`
- Do list out the environment variables your app uses
  - i.e., create a `dist.env` and `git add` it

With Sequelize, this happens in three steps:

1. Install/configure `dotenv`
2. Tell your app to `.use()` `dotenv`
3. Configure Sequelize to use `dotenv`


## Part 1: add `dotenv` to your project

- install `dotenv`
- create a `.env` file
  - hide it from git
- create an example `.env` file without the sensitive info
  - add it to git

### Install `dotenv`

```sh
npm i dotenv
```

### Create a `.env` file

Create your `.env` file with the following:

```
DB_USER=real_database_username
DB_PASSWORD=real_database_password
DB_NAME=real_database_name
DB_HOST=real_database_hostname
```

Make sure there are NO SPACES before or after the `=`.
This isn't JavaScript, it's "shell".

(Use the values correct values, of course.)

### Hide your `.env` from git

`.env` should be part of your .gitignore:

```sh
echo ".env" >> .gitignore # creates if it does not exist, otherwise appends!
git add .gitignore
git commit -am 'ignores .env'
```

### Create a `.env` example file (`dist.env`)

`dist.env` is a common choice for the "OK to distribute version" of your `.env` file.

It should show all the environment variables you use in your app, but with blank values:

```
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
```

### Add your example `.env` file to git


```sh
git add dist.env
git commit -am 'adds example .env file'
```


## Part 2: use `dotenv` in your `index.js`

### Tell your app to load info from `dotenv`

At the top of `index.js`

```js
require('dotenv').config(); // loads your info from the .env file in your project
```

You want to load the secrets before doing anything else.


## Part 3: make Sequelize aware of `dotenv`

- Create a `.sequelizerc` (copy paste this)
  - Add it to git
- If updating an existing project:
  - Change your `config.json` to a `config.js`
  - Tell `models/index.js` to use `config.js`

### Tell `sequelize` to use `dotenv`

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

#### Add `.sequelizerc` to git

```sh
git add .sequelizerc
```

### If adding `dotenv` to an existing project:

#### Change `config.json` to `config.js` 

To use the environment variables, you need to make two changes to your configuration:

- Rename it from a `.json` file to a `.js` file
- Add `module.exports = ` at the very beginning.

It will look like this:

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


### Tell `models/index.js` to use `config.js`.

Open the `models/index.js` and find the `require('../config/config.json`). 

Change it from `config.json` to `config.js` (since you renamed the file in the previous step).

You'll end up with this:

```js
const config = require(__dirname + '/../config/config.js')[env];
```

