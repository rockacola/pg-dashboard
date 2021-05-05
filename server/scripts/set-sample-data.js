/**
 * Set sample data script.
 * 
 * Example usage:
 * node scripts/set-sample-data postgresql://user:pass@localhost:5432/default_db
 */
const { Client } = require('pg')
const Chance = require('chance')

process.on('uncaughtException', (reason) => {
  console.log('Unhandled rejection. reason:', reason)
  process.exit(1)
})

const chance = new Chance()
const CUSTOMER_COUNT = 30
const OFFICE_COUNT = 15
const VISIT_LOG_COUNT = 100
const connectionString = process.argv[2]

async function dropTable(client, name) {
  const dropSql = `DROP TABLE IF EXISTS ${name};`
  await client.query(dropSql)
}

async function createCustomerTable(client) {
  const tableName = 'customer'
  await dropTable(client, tableName)

  const createSql = `
CREATE TABLE ${tableName} (
  id serial PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  membership_code integer NOT NULL,
  is_verified boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);`
  await client.query(createSql)
}

async function insertCustomerData(client) {
  const tableName = 'customer'

  for (let i = 0; i < CUSTOMER_COUNT; i++) {
    const sql = `
INSERT INTO ${tableName} (first_name, last_name, membership_code, is_verified)
VALUES ($1, $2, $3, $4)
`
    const values = [
      chance.first(),
      chance.last(),
      chance.natural({ min: 1, max: 6 }),
      chance.bool(),
    ]
    await client.query(sql, values)
  }
}

async function createOfficeTable(client) {
  const tableName = 'office'
  await dropTable(client, tableName)

  const createSql = `
CREATE TABLE ${tableName} (
  id serial PRIMARY KEY,
  company_name text NOT NULL,
  address text NOT NULL,
  zip_code integer NOT NULL,
  state text NOT NULL,
  country text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);`
  await client.query(createSql)
}

async function insertOfficeData(client) {
  const tableName = 'office'

  for (let i = 0; i < OFFICE_COUNT; i++) {
    const sql = `
INSERT INTO ${tableName} (company_name, address, zip_code, state, country)
VALUES ($1, $2, $3, $4, $5)
`
    const values = [
      chance.company(),
      chance.address(),
      chance.zip(),
      chance.state(),
      'US',
    ]
    await client.query(sql, values)
  }
}

async function createVisitLogTable(client) {
  const tableName = 'visit_log'
  await dropTable(client, tableName)

  const createSql = `
CREATE TABLE ${tableName} (
  id serial PRIMARY KEY,
  customer_id integer NOT NULL,
  office_id integer NOT NULL,
  visit_type int NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);`
  await client.query(createSql)
}

async function insertVisitLogData(client) {
  const tableName = 'visit_log'

  for (let i = 0; i < VISIT_LOG_COUNT; i++) {
    const sql = `
INSERT INTO ${tableName} (customer_id, office_id, visit_type, created_at)
VALUES ($1, $2, $3, $4)
`
    const values = [
      chance.natural({ min: 1, max: CUSTOMER_COUNT }),
      chance.natural({ min: 1, max: OFFICE_COUNT }),
      chance.natural({ min: 1, max: 3 }),
      chance.date(),
    ]
    await client.query(sql, values)
  }
}

;(async () => {
  console.log('=== START ===')

  const client = new Client(connectionString)
  console.log('Connect to database...')
  await client.connect()

  console.log('Set customer data...')
  await createCustomerTable(client)
  await insertCustomerData(client)

  console.log('Set office data...')
  await createOfficeTable(client)
  await insertOfficeData(client)

  console.log('Set visit log data...')
  await createVisitLogTable(client)
  await insertVisitLogData(client)

  await client.end()

  console.log('=== END ===')
})()
