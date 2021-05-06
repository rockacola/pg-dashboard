require('dotenv').config({ path: './.env.test' })
const axios = require('axios')
const qs = require('query-string')

describe('API', () => {
  test('/health', async () => {
    const url = process.env.API_BASE_URL + '/health'
    const res = await axios(url)
    expect(res.data.isSuccess).toBe(true)
  })

  test('/check', async () => {
    const url = qs.stringifyUrl({
      url: process.env.API_BASE_URL + '/check',
      query: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_DEFAULT,
      },
    })
    const res = await axios(url)
    expect(res.data.isSuccess).toBe(true)
  })

  test('/query', async () => {
    const url = qs.stringifyUrl({
      url: process.env.API_BASE_URL + '/query',
      query: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        db: process.env.DB_DEFAULT,
        q: `SELECT 'John' as name`,
      },
    })
    const res = await axios(url)
    expect(res.data.isSuccess).toBe(true)
    expect(res.data.data.rows[0].name).toBe('John')
  })
})
