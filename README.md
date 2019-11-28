# api-pen
[![CircleCI](https://circleci.com/gh/onwuvic/node-forum/tree/develop.svg?style=svg)](https://circleci.com/gh/onwuvic/node-forum/tree/develop) [![Maintainability](https://api.codeclimate.com/v1/badges/d44a0af08f04fb0d7c94/maintainability)](https://codeclimate.com/github/onwuvic/node-forum/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/d44a0af08f04fb0d7c94/test_coverage)](https://codeclimate.com/github/onwuvic/node-forum/test_coverage) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

A TDD (Test Driven Development) Forum web application (Postgres, Express, Node and Sequelize ORM, Angular) API and frontend. 

## feature
- User can start a discussion thread.
- User can reply a thread
- User can subscribe to a thread
- user can get instant notification for all their subscription
- User can follow another user
- user can perform all CRUD Operation a thread they created
- user can perform all CRUD Operation a reply they created
- lot more coming...

## tools
babel, eslint, airbnb javascript style guide, code-climate, circle-ci, sequelize, express, node, postgres, dotenv, jest, Angular 7, 

## Usage
- clone it `git clone git@github.com:onwuvic/node-forum.git`.
### Backend Setup
- cd into `node-forum/server`
- run `npm install`
- rename .env.sample to .env and populate the required parameters
- set up your postgres database
- run `npm run dev`
- to test with postman with these API'S ``

### Frontend Setup
- cd into `node-forum/client`
- run `npm install`
- run `ng serve`

## Package.json Scripts and usage
`npm run [name_of_the_script]`
- test: This is used to run your tests.
- dev: This is used to run your application on development (development mode).
- start: This is used to run your application on production (production mode). It set the environment to production then run the `build` and `serve` script respectively.
- serve: This is used to run your es5 transpiled application code in the `dist` folder.
- lint: This is used to lint your codebase to ensure it adhere to airbnb standard.
- lint:fix : This is used to auto fix the lint issues on your codebase.
- db:seed : This is used to run sequelize seed operation.
- db:migrate : This is used to run sequelize migrate operation.
- db:rollback : This is used to run sequelize rollback operation.
- db:rollmigrate : This is used to run `db:rollback`, `db:migrate` sequentially.
- db:rollmigrateseed : This is used to run `db:rollback`, `db:migrate`, and `db:seed` sequentially.
- clean: This is used to remove and recreate `dist` folder.
- build-server: This is used transpile your ES6/7/8/9 code to ES5 into the `dist` folder.
- build: This runs the `clean` and `build-server` scripts.
