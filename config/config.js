/**
 * Name: Misha Mansoor
 * Date: 15th October 2023 
 * file: config.js
 * Description: database connection point (MongoDb connection string)
 */
const config = {
baseURL : '0.0.0.0',
 env: process.env.NODE_ENV || 'development', 
 port: process.env.PORT || 10000,
 jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key", 
mongoUri: process.env.MONGODB_URI || "mongodb+srv://admin:ABC123@cluster0.d1g3bmo.mongodb.net/online-market-store?retryWrites=true&w=majority "||
process.env.MONGO_HOST ||
 'mongodb://' + (process.env.IP || 'localhost') + ':' + 
(process.env.MONGO_PORT || '27017') +
 '/mernproject' 
 }
 export default config

