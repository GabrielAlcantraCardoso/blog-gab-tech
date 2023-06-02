
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,                                              
  ssl: {
    rejectUnauthorized: false
  }
  

});

pool.on('connect', () => {
  console.log('Connected to the database');
  console.log(`Connected to the database ${process.env.DATABASE_URL}`);


});

pool.on('error', (err) => {
  console.error('Database error:', err.stack);
 
});

console.log("realmente chegou aqui")
module.exports = pool;
