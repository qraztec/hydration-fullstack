// /lib/db.ts
import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL || "postgresql://hydration_data_cuem_user:AzwRb0OHkxEyNa0keMbtEymNACtcgcUp@dpg-criui3e8ii6s73fal8p0-a.virginia-postgres.render.com/hydration_data_cuem",
    ssl: { rejectUnauthorized: false },
  },
});

// Test the database connection by running a simple query
db.raw('SELECT 1+1 AS result')
  .then(() => {
    console.log('PostgreSQL database connected successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

export default db;
