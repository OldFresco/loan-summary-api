process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require('babel-register');
require('./app/server');

//TODO
//Extract HMAC stuff into it's own repo and consume as Node module - Nearly easy
//Extract useful info form auth token and map to customer data in persistence - Middlewate probs - EASY-ish
//Make agreement reference globally accessible to controllers (put in req object) - EASY
//Fix customer object model - SUPER EASY
//Data mapping in Loan summary controller - EASY
//ConversationId - Probs easy?
//Tests - ... wut?
//Make settings.js use modular Settings.json files - SUPER EASY
//Add Datadog instrumentation-- EASY
//Add More logging - EASY
