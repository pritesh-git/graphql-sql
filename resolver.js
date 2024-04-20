import { GraphQLError } from 'graphql'
import { connection } from './_cnctDb.js'

export const resolvers = {
  Query: {
    async users() {
      const users = await connection.execute('SELECT * FROM users;')
      if (!users.length) throw new Error('Users not found')

      return users
    },
    async user(_, args) {
      const users = await connection.execute(
        `SELECT * FROM users WHERE id = ${args.id};`,
      )
      if (!users.length)
        throw new Error(`User with ID: '${args.id}' not found.`)
      return users[0]
    },
  },
  Mutation: {
    async addUser(_, args) {
      const { email, name, password } = args.user
      const existingUser = await connection.execute(
        `SELECT * FROM users WHERE email = '${email}';`,
      )
      if (existingUser.length)
        throw new GraphQLError(`User with email: '${email}' already exist!`, {
          extensions: { code: 'DUPLICATE_EMAIL', stacktrace: [] },
        })
      const newUser = await connection.execute(
        `INSERT INTO users (name, email, password, role, isActive) VALUES ('${name}','${email}','${password}','user',true);`,
      )
      return { id: newUser.insertId, name, email }
    },

    async editUser(_, args) {
      const { id, user } = args
      const existingUser = await connection.execute(
        `SELECT * FROM users WHERE id = '${id}';`,
      )
      if (!existingUser.length)
        throw new Error(`User with ID: '${id}' not found.`)

      const updateFields = Object.keys(user)
      const updateValues = Object.values(user)
      const updateString = updateFields.join(', ') + ' = ?'
      const updateQuery = `UPDATE users SET ${updateString} WHERE id = ?`

      const params = [...updateValues, id]
      const [] = await connection.execute(updateQuery, params)

      return existingUser[0]
    },

    async deleteUser(_, args) {
      const { id } = args
      const existingUser = await connection.execute(
        `SELECT * FROM users WHERE id = '${id}';`,
      )
      if (!existingUser.length)
        throw new Error(`User with ID: '${id}' not found.`)

      const [] = await connection.execute(`DELETE FROM users WHERE id = ${id};`)
      return existingUser[0]
    },
  },
}
