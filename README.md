# Loan Summary API Proof of Conecept built on top of Express & ES6 API Boilerplate


## Features
- [x] ES6 for javascript awesomeness
- [x] [MongoDB](https://www.mongodb.com/) w/ [Mongoose](http://mongoosejs.com/) for data layer
- [x] Testing via [Mocha](https://mochajs.org/) & [Chai](http://chaijs.com/)
- [x] Test coverage via [Isparta](https://github.com/douglasduteil/isparta)

## Getting Started
First, ensure you have node and mongo installed on your system.

```sh
# Install dependencies
npm install

# Run it
npm start

## Commands

- `npm start`
  - Start live-reloading development server

- `npm test`
  - Run test suite

- `npm run test:watch`
  - Run test suite with auto-reloading

- `npm run coverage`
  - Run test coverage

- `npm run build`
  - Generates production ready application in `./build`

## Todo
- [ ] Extract HMAC stuff into own repo and consume as Node module - Nearly easy
- [ ] Extract useful info form auth token and map to customer data in persistence - Middlewate probs - EASY-ish
- [ ] Make agreement reference globally accessible to controllers (put in req object) - EASY
- [ ] Fix customer object model - SUPER EASY
- [ ] Data mapping in Loan summary controller - EASY
- [ ] Tests - ... wut?
- [ ] Make settings.js use modular Settings.json files - SUPER EASY
- [ ] Add Datadog instrumentation-- EASY
- [ ] Add More logging - EASY

## License
MIT