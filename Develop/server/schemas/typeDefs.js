const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
  _id: ID
  name: String
}

  type Item {
    _id: ID
    title: String!
    description: String!
    image: String
    price: Float
    quantity: Int
    category: Category
  }


  type User {
    _id: ID
    firstName: String
    lastName: String
    userName: String
    email: String
    address: String
    orders: [Order]
  }

  scalar DateTime

  type Order {
    purchaseDate: DateTime
    items: Item
    users: User
    _id: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    categories: [Category]
    item(category: ID, name: String): [Item]
    user: [User]
    order: [Order]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      userName: String!
      password: String!
      address: String!
    ): Auth
  
    addOrder(
      purchaseDate: DateTime
      items: ID!
      users: ID!
      ): Order

    addItem(
      title: String
      description: String
      image: String
      price: Float
      quantity: Int
      category: ID
    ): Item
  }
`;

module.exports = typeDefs;
