export const typeDefs = `#graphql
 type User {
        id: ID!
        name: String!
        email: String!
        # password: String!
        role: String!
        isActive: Boolean!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }

    type Mutation {
        addUser(user: addUserInput): User
        editUser(id:ID!,user:editUserInput): User
        deleteUser(id:ID!): User
    }

    input addUserInput{
        name: String!
        email: String!
        password: String!
        role: String
        isActive: Boolean
    }

    input editUserInput{
        name: String
        email: String
        password: String
        isActive: Boolean 
    }
`
