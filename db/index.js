import { Pool } from 'pg';

const DB = new Pool({ connectionString: null });

DB.query(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE TABLE IF NOT EXISTS users(
    id uuid DEFAULT uuid_generate_v4 (),
    email VARCHAR(256) UNIQUE NOT NULL,
    password VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
  );
`);

export const collection = async (...input) => {
  try {
    const results = await DB.query(...input);
    return results.rows;
  } catch (err) {
    console.log('Error querying collection', err);
  }
};

export const single = async (...input) => {
  try {
    const results = await DB.query(...input);
    const [item] = results.rows || [];
    return item;
  } catch (err) {
    console.log('Error querying single', err);
  }
};

export default { collection, single };
