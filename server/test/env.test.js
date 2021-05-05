require('dotenv').config({ path: './.env.test' })

describe('.env.test', () => {
  test('NODE_ENV', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})
