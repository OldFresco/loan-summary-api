import mongoose from 'mongoose';
import settings from './config/settings';

// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
mongoose.connect(settings.mongo.uri);
mongoose.connection.on('error', (err) => { throw err; });
