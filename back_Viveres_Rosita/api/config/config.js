require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'Development',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,

  isProd: process.env.NODE_ENV === 'production',
  dbUrl: process.env.DATABASE_URL,

  auth: {
    tokenSecret: process.env.TOKEN_SECRET,
    // expiresIn: process.env.AUTH_EXPIRES_IN || 60 * 60,
  },
}

module.exports = { config };
