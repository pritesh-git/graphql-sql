import mysql from 'mysql2/promise'

const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
  return connection
}

export const connection = await connectToDatabase()
