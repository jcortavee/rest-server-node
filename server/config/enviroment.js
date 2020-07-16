// PORT
process.env.PORT = process.env.PORT || 5014;

// Enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'devs';

// Database
let database = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost:27017/cafe' :
    'mongodb+srv://jcarlos21:1m42tLD79CByl2uX@cluster0.5mozg.mongodb.net/cafe'

process.env.URL_DATABASE = database;