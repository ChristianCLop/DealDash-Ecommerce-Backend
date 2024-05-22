const {config} = require('dotenv');
config();

const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';
const IP = process.env.IP

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    },
    PAYPAL_API_CLIENT,
    PAYPAL_API_SECRET,
    PAYPAL_API,
    IP
}