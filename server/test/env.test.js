require('dotenv').config({ path: './.env.test' })

describe('.env.test', () => {
  test('API_BASE_URL', () => {
    expect(process.env.API_BASE_URL).toBe('http://localhost:3300/api')
  })
})
